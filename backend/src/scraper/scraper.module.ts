import { Module } from '@nestjs/common';
import { GetAndProcessNewNewsCommand } from './commands/getAndProcessNewNews.command';
import { NewsController } from './controller/news.controller';
import { SentimentController } from './controller/sentiment.controller';
import { NewsArticleRepository } from './repositories/news.repository';
import { ArticleSourceRepository } from './repositories/source.repository';

@Module({
  imports: [],
  controllers: [NewsController, SentimentController],
  providers: [
    GetAndProcessNewNewsCommand,
    ArticleSourceRepository,
    NewsArticleRepository,
  ],
  exports: [NewsArticleRepository],
})
export class ScraperModule {}
