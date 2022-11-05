import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { GatewayRepository } from './repository/gateway.repository';

@Module({
  providers: [MyGateway, GatewayRepository],
  exports: [GatewayRepository],
})
export class GatewayModule {}
