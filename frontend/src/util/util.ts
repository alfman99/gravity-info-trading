import { NewsArticle } from "../provider/Websocket"

export enum Sentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral'
}

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

export const getTimeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed) as {
    value: number
    unit: Intl.RelativeTimeFormatUnit
  }
  return rtf.format(value, unit)
}

export const determineSentiment = (article: NewsArticle) => {
  if (Math.abs(article.sentiment_positive - article.sentiment_negative) < 0.2) {
    return Sentiment.Neutral
  }
  else {
    return article.sentiment_positive > article.sentiment_negative ? Sentiment.Positive : Sentiment.Negative
  }
}

export const getDomain = (url: string) => {
  return new URL(url).hostname
}

export const calculatePositiveGeneralSentiment = (articles: NewsArticle[]) => {
  const total = articles.length;
  let sentiment = 0;
  articles.forEach(article => {
    sentiment += article.sentiment_positive;
  });
  return sentiment * 100 / total;
}
