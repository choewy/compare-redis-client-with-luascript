import { Controller, Get, Param } from '@nestjs/common';

import { TestKey } from '@/common';

import { RedisLuascriptService } from './redis-luascript.service';

@Controller('redis-luascript')
export class RedisLuascriptController {
  constructor(private readonly redisLuascriptService: RedisLuascriptService) {}

  @Get()
  async testAll() {
    return this.redisLuascriptService.testAll();
  }

  @Get(':key')
  async testByKey(@Param('key') key: TestKey) {
    return this.redisLuascriptService.testByKey(key);
  }
}
