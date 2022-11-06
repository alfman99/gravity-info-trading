import { Badge, Button, Card, Group, Text } from "@mantine/core"
import ClampLines from "react-clamp-lines"
import { NewsArticle } from "../provider/Websocket"
import { determineSentiment, getDomain, getTimeAgo, Sentiment } from "../util/util"



interface NewsArticleProps {
  news: NewsArticle
}


const getColorBySentiment = (sentiment: Sentiment) => {
  switch (sentiment) {
    case Sentiment.Positive:
      return 'green'
    case Sentiment.Negative:
      return 'red'
    case Sentiment.Neutral:
      return 'gray'
    default:
      return 'gray'
  }
}

const getEmojiBySentiment = (sentiment: Sentiment) => {
  switch (sentiment) {
    case Sentiment.Positive:
      return '😁'
    case Sentiment.Negative:
      return '😢'
    case Sentiment.Neutral:
      return '😐'
    default:
      return '😐'
  }
}

const NewsCard = ({ news }: NewsArticleProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" mb='sm' withBorder>
      <Group style={{ height: '100%' }}>
        <Text size="md" color="dimmed" style={{ width: '100%', overflow: 'hidden' }}>
          <ClampLines
            text={news.content}
            id="really-unique-id"
            lines={5}
            ellipsis="..."
            innerElement="p"
            buttons={false}
          />
        </Text>
      </Group>
      <Group style={{ flexDirection: 'column' }} pt='md'>
        <Text size="sm" color="dimmed">
          Origin: {getDomain(news.url)}
        </Text>
        <Text size="sm" color="dimmed">
          Published: {getTimeAgo(new Date(news.published_at).getTime())}
        </Text>
        <Group position="apart" mt={'lg'} style={{ flexDirection: 'row', alignItems: 'stretch' }}>
          <a href={news.url} target="_blank" rel="noreferrer" style={{ flexGrow: '1' }}>
            <Button variant="light" color="blue" mt="md" radius="md" style={{ flexGrow: '1' }}>
              Go to source
            </Button>
          </a>
          <Badge color={getColorBySentiment(determineSentiment(news))} variant="light" style={{ height: '4em', width: '4em', fontSize: '1em' }}>
            {getEmojiBySentiment(determineSentiment(news))}
          </Badge>
        </Group>
      </Group>
    </Card>
  )
}

export default NewsCard