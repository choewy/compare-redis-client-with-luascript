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
    new RedisLuascriptOption(LuascriptCommand.Save, 0),
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

  async testAll() {
    const keys = Object.values(TestDataKey);

    const timer = new Timer(async () => {
      const results: object[] = [];

      for (const key of keys) {
        const target = new TestData()[key]('redis-luascript');
        const result = await this.redis.executeLuascript(LuascriptCommand.Save, target.key, target.value);

        if (result == null) {
          continue;
        }

        results.push(result);
      }

      return results;
    });

    return timer.run();
  }

  async testByKey(key: TestDataKey) {
    if (Object.values(TestDataKey).includes(key) === false) {
      throw new BadRequestException();
    }

    const target = new TestData()[key]('redis-luascript');
    const timer = new Timer(async () => {
      return await this.redis.executeLuascript(LuascriptCommand.Save, target.key, target.value);
    });

    return timer.run();
  }
}
