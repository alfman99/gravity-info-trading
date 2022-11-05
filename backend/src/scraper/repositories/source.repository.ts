import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from '../../shared/constants';
import { ArticleSource } from '../entities/source.entity';

@Injectable()
export class ArticleSourceRepository {
  constructor(@Inject(KNEX) private readonly knex: Knex) {}

  async getAll() {
    const rows = await this.knex('sources').select('*');
    if (!rows) {
      return [];
    }
    return rows.map((row) => {
      return new ArticleSource(
        row.query_selector_URL,
        row.query_selector_content,
        row.url,
        row.domain,
        row.asset,
        row.id,
      );
    });
  }
}
