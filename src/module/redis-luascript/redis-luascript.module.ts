import { Module } from '@nestjs/common';

import { RedisLuascriptController } from './redis-luascript.controller';
import { RedisLuascriptService } from './redis-luascript.service';

@Module({
  controllers: [RedisLuascriptController],
  providers: [RedisLuascriptService],
})
export class RedisLuascriptModule {}
