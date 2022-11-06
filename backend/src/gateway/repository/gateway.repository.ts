import { Injectable } from '@nestjs/common';
import { NewsArticle } from '../../scraper/entities/news_article.entity';
import { MyGateway } from '../gateway';

@Injectable()
export class GatewayRepository {
  constructor(private readonly gateway: MyGateway) {}

  async sendNewsArticleToAllClients(news: NewsArticle) {
    this.gateway.server.emit(
      'newNewsArticle',
      new NewsArticle(
        news.url,
        news.content.substring(0, 250),
        news.asset,
        news.published_at,
        news.sentiment_positive,
        news.sentiment_negative,
        news.id,
      ),
    );
  }
}
