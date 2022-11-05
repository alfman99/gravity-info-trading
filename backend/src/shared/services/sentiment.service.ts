import { Injectable, Logger } from '@nestjs/common';
import { NewsArticle } from '../../scraper/entities/news_article.entity';
import { NewsArticleRepository } from '../../scraper/repositories/news.repository';

@Injectable()
export class SentimentService {
  constructor(
    private readonly logger: Logger,
    private readonly newsRepository: NewsArticleRepository,
  ) {}

  private calculateValueofSingleNew(
    newsArt: NewsArticle,
    numberOfNews: number,
  ) {
    return 1 / numberOfNews;
  }

  async getGeneralSentimentOfLastNNews(n: number) {
    const news = await this.newsRepository.getLastNNews(n);
    let valueReturn = 0;
    for (const newsArt of news) {
      valueReturn += this.calculateValueofSingleNew(newsArt, news.length);
    }
    return valueReturn;
  }

  // TODO: Implement with AI model, for now just return 1
  async getSentimenValueOfNews(newsArt: NewsArticle) {
    return 1;
  }
}
