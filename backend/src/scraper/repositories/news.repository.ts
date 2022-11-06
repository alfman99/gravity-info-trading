import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from '../../shared/constants';
import { NewsArticle } from '../entities/news_article.entity';

@Injectable()
export class NewsArticleRepository {
  constructor(@Inject(KNEX) private readonly knex: Knex) {}

  async add(news: NewsArticle) {
    const val = await this.knex('news')
      .insert({
        url: news.url,
        content: news.content.trim(), // Trim new lines and spaces
        asset: news.asset,
        published_at: news.published_at,
        sentiment_positive: news.sentiment_positive,
        sentiment_negative: news.sentiment_negative,
      })
      .returning('*');
    return new NewsArticle(
      val[0].url,
      val[0].content,
      val[0].asset,
      val[0].published_at,
      val[0].sentiment_positive,
      val[0].sentiment_negative,
      val[0].id,
    );
  }

  async exists(newsURL: string) {
    const rows = await this.knex('news').select('*').where({ url: newsURL });
    return rows.length > 0;
  }

  async update(news: NewsArticle) {
    await this.knex('news')
      .where({ id: news.id })
      .update({
        ...news,
      });
  }

  async getLastNNews(n: number) {
    const rows = await this.knex('news')
      .select('*')
      .orderBy('published_at', 'desc')
      .limit(n);
    if (!rows) {
      return [];
    }
    return rows.map((row) => {
      return new NewsArticle(
        row.url,
        row.content,
        row.asset,
        row.published_at,
        row.sentiment_positive,
        row.sentiment_negative,
        row.id,
      );
    });
  }
}
