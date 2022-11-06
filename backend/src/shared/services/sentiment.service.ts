import { Injectable, Logger } from '@nestjs/common';
import { NewsArticle } from '../../scraper/entities/news_article.entity';
import { NewsArticleRepository } from '../../scraper/repositories/news.repository';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SentimentService {
  constructor(
    private readonly logger: Logger,
    private readonly newsRepository: NewsArticleRepository,
    private readonly config: ConfigService,
  ) {}

  async getGeneralSentimentOfLastNNews(n: number) {
    const news = await this.newsRepository.getLastNNews(n);
    let positive_sentiment = 0;
    let negative_sentiment = 0;
    for (const newsArt of news) {
      positive_sentiment += newsArt.sentiment_positive;
      negative_sentiment += newsArt.sentiment_negative;
    }

    // soft max
    const sum = positive_sentiment + negative_sentiment;
    positive_sentiment /= sum;
    negative_sentiment /= sum;

    return {
      positive: positive_sentiment,
      negative: negative_sentiment,
    };
  }

  async getSentimentValueOfNews(newsArt: NewsArticle) {
    const response = await fetch(`${this.config.get('SENTIMENT_API_URL')}/`, {
      method: 'POST',
      body: JSON.stringify({
        text: newsArt.content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    return json as {
      positive: number;
      negative: number;
    };
  }
}
