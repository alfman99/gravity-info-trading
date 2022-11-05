import { Module } from '@nestjs/common';
import { NewsArticleRepository } from '../scraper/repositories/news.repository';
import { MyGateway } from './gateway';
import { GatewayRepository } from './repository/gateway.repository';

@Module({
  providers: [MyGateway, GatewayRepository, NewsArticleRepository],
  exports: [GatewayRepository],
})
export class GatewayModule {}
