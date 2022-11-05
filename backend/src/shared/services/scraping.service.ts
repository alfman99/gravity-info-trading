import { Injectable, Logger } from '@nestjs/common';
import { parse } from 'node-html-parser';
import { NewsArticle } from '../../scraper/entities/news_article.entity';
import { ArticleSource } from '../../scraper/entities/source.entity';
import { NewsArticleRepository } from '../../scraper/repositories/news.repository';
import fetch from 'node-fetch';

@Injectable()
export class ScrapingService {
  constructor(
    private readonly newsRepository: NewsArticleRepository,
    private readonly logger: Logger,
  ) {}

  private async getNewsPage(source: ArticleSource) {
    return new Promise<string>(async (resolve) => {
      const response = await fetch(source.url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const text = await response.text();
      // Parse to HTML
      // Get the URL of the article
      const landingContent = parse(text);

      // Get the URL of the first article
      const elementURLLanding = landingContent.querySelector(
        source.query_selector_URL,
      );

      // Check if the article is already in the database
      let hrefVal = elementURLLanding.attributes.href;

      if (!hrefVal.startsWith('http') && !hrefVal.startsWith('https')) {
        hrefVal = source.domain + hrefVal;
      }

      if (hrefVal === '' || hrefVal === null || hrefVal === undefined) {
        return resolve(null);
      }

      if (await this.newsRepository.exists(hrefVal)) {
        this.logger.log('Article already exists in database');
        return resolve(null);
      } else {
        this.logger.log('Article does not exist in database, adding it...');
        return resolve(hrefVal);
      }
    });
  }

  private async getNewsContent(sourceURL: string, source: ArticleSource) {
    return new Promise<NewsArticle>(async (resolve) => {
      // Get the content of the article
      const responseArticle = await fetch(sourceURL, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      const textArticle = await responseArticle.text();

      // Parse to HTML
      const articleContent = parse(textArticle);

      const elementContentArticle = articleContent.querySelector(
        source.query_selector_content,
      );

      let content = elementContentArticle.textContent;

      if (content.length >= 50000) {
        content = content.substring(0, 49999);
      }

      const newsArticle = new NewsArticle(sourceURL, content, source.asset);

      // Save the article in the database
      const retVal = await this.newsRepository.add(newsArticle);

      return resolve(retVal);
    });
  }

  async getLastArticleFromSource(source: ArticleSource) {
    return new Promise<NewsArticle | null>(async (resolve) => {
      const articleURL = await this.getNewsPage(source);

      if (articleURL === null) {
        return resolve(null);
      }

      const newsArticle = await this.getNewsContent(articleURL, source);

      return resolve(newsArticle);
    });
  }
}
