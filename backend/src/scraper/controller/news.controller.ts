import { Controller, Get } from '@nestjs/common';
import { GatewayRepository } from '../../gateway/repository/gateway.repository';
import { SentimentService } from '../../shared/services/sentiment.service';
import { GetAndProcessNewNewsCommand } from '../commands/getAndProcessNewNews.command';
import { NewsArticle } from '../entities/news_article.entity';
import { NewsArticleRepository } from '../repositories/news.repository';

@Controller('news')
export class NewsController {
  constructor(
    private readonly getNewsCommand: GetAndProcessNewNewsCommand,
    private readonly sentimentService: SentimentService,
    private readonly newsRepository: NewsArticleRepository,
    private readonly gateway: GatewayRepository,
  ) {}

  @Get('trigger-fetch')
  async getStreamsWhereCurrentlyTrackingUser() {
    const listNews = await this.getNewsCommand.execute();

    if (listNews.length <= 0 || listNews.every((news) => news === null)) {
      return 'No new news found';
    }

    for (const newsArt of listNews) {
      const sentimentValue =
        await this.sentimentService.getSentimentValueOfNews(newsArt);

      const newVal = new NewsArticle(
        newsArt.url,
        newsArt.content,
        newsArt.asset,
        newsArt.published_at,
        sentimentValue.positive,
        sentimentValue.negative,
        newsArt.id,
      );

      await this.newsRepository.update(newVal);

      await this.gateway.sendNewsArticleToAllClients(newVal);
    }

    return `Done, ${listNews.length} news processed`;
  }
}
