import { Injectable, Logger } from '@nestjs/common';
import { NewsArticle } from '../entities/news_article.entity';
import { ArticleSourceRepository } from '../repositories/source.repository';
import { ScrapingService } from '../../shared/services/scraping.service';

@Injectable()
export class GetAndProcessNewNewsCommand {
  constructor(
    private readonly logger: Logger,
    private readonly sourcesRepository: ArticleSourceRepository,
    private readonly scrapingService: ScrapingService,
  ) {}

  async execute() {
    this.logger.log('GetAndProcessNewNewsCommand.execute()');
    // Get list of sources to scrap from database
    const sources = await this.sourcesRepository.getAll();

    const promisesNewsArticles: Promise<NewsArticle>[] = [];
    // Iterate over each source
    for (const source of sources) {
      // Scrap the source with the given configuration
      promisesNewsArticles.push(
        this.scrapingService.getLastArticleFromSource(source),
      );
    }

    // Wait for all promises to resolve
    const newsArticles = await Promise.all(promisesNewsArticles);

    return newsArticles;
  }
}
