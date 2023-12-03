import { BadRequestException, Controller, Get, Param } from '@nestjs/common';

import { TestDataKey } from '@/common';

import { RedisLuascriptService } from './redis-luascript.service';

@Controller('redis-luascript')
export class RedisLuascriptController {
  constructor(private readonly redisLuascriptService: RedisLuascriptService) {}

  @Get(':key')
  async test(@Param('key') key: TestDataKey) {
    if (Object.values(TestDataKey).includes(key) === false) {
      throw new BadRequestException();
    }

    return this.redisLuascriptService.test(key);
  }
}
