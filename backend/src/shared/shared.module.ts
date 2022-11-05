import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import knex from 'knex';
import { KNEX } from './constants';
import { ScrapingService } from './services/scraping.service';
import { config } from 'dotenv';
import { ScraperModule } from '../scraper/scraper.module';
import { SentimentService } from './services/sentiment.service';

config();

const knexProvider = {
  provide: KNEX,
  useFactory: () => {
    return knex({
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),
      },
      pool: {
        min: 0,
        max: parseInt(process.env.DB_MAX_CONNECTIONS, 10),
      },
    });
  },
};

const providers = [ScrapingService, Logger, knexProvider, SentimentService];

@Global()
@Module({
  imports: [ConfigModule.forRoot(), ScraperModule],
  providers,
  exports: [...providers],
})
export class SharedModule {}
