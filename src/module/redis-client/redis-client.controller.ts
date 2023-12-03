import { Controller, Get, Param } from '@nestjs/common';

import { TestDataKey } from '@/common';

import { RedisClientService } from './redis-client.service';

@Controller('redis-client')
export class RedisClientController {
  constructor(private readonly redisClientService: RedisClientService) {}

  @Get(':key')
  async test(@Param('key') key: TestDataKey) {
    return this.redisClientService.test(key);
  }
}
