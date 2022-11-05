import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { NewsArticleRepository } from '../scraper/repositories/news.repository';

@WebSocketGateway({
  namespace: 'news',
})
export class MyGateway implements OnGatewayConnection {
  constructor(
    private readonly newsRepository: NewsArticleRepository,
    private readonly logger: Logger,
  ) {}

  async handleConnection(client: Socket) {
    const response = await this.newsRepository.getLastNNews(15);
    client.emit('initListArticles', response);
    this.logger.log(`Client connected: ${client.id}`);
  }

  @WebSocketServer()
  public server: Server;
}
