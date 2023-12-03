import { Controller, Get, Param } from '@nestjs/common';

import { TestKey } from '@/common';

import { RedisClientService } from './redis-client.service';

@Controller('redis-client')
export class RedisClientController {
  constructor(private readonly redisClientService: RedisClientService) {}

  @Get()
  async testAll() {
    return this.redisClientService.testAll();
  }

  @Get(':key')
  async testByKey(@Param('key') key: TestKey) {
    return this.redisClientService.testByKey(key);
  }
}
