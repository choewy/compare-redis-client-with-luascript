import { BadRequestException, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { RedisConfig, TestData, TestDataKey } from '@/common';
import { RedisClient, RedisLuascriptOption, Timer } from '@/core';

import { LuascriptCommand } from './enums';

@Injectable()
export class RedisLuascriptService implements OnApplicationBootstrap {
  private readonly redis: RedisClient;
  private readonly redisLuascripts: RedisLuascriptOption[] = [
    new RedisLuascriptOption(LuascriptCommand.Get, 0),
    new RedisLuascriptOption(LuascriptCommand.Set, 0),
  ];

  constructor() {
    this.redis = new RedisClient(new RedisConfig().getOptions());
  }

  async onApplicationBootstrap(): Promise<void> {
    for (const luascript of this.redisLuascripts) {
      this.redis.defineCommand(luascript.command, luascript.definition);
    }

    await this.redis.connect();
  }

  async test(key: TestDataKey) {
    if (Object.values(TestDataKey).includes(key) === false) {
      throw new BadRequestException();
    }

    const target = new TestData()[key]('redis-luascript');
    const timer = new Timer(async () => {
      await this.redis.executeLuascript(LuascriptCommand.Set, target.key, target.value);
      return await this.redis.executeLuascript<object>(LuascriptCommand.Get, target.key);
    });

    return timer.run();
  }
}
