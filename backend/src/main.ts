import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './gateway/socket-io-adapter';
import { AllExceptionsFilter } from './shared/catch-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const configService = app.get(ConfigService);

  const port = parseInt(configService.get('PORT'));

  app.enableCors({
    origin: [`*`],
  });

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(port || 3000);
}
bootstrap();
