import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { MyGateway } from './gateway/gateway';
import { GatewayModule } from './gateway/gateway.module';
import { ScraperModule } from './scraper/scraper.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    GatewayModule,
    ScraperModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [],
  providers: [AppService, MyGateway],
})
export class AppModule {}
