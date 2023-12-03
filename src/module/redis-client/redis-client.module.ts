import { Module } from '@nestjs/common';

import { RedisClientController } from './redis-client.controller';
import { RedisClientService } from './redis-client.service';

@Module({
  controllers: [RedisClientController],
  providers: [RedisClientService],
})
export class RedisClientModule {}
