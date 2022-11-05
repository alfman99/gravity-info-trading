import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'news',
})
export class MyGateway {
  @WebSocketServer()
  public server: Server;
}
