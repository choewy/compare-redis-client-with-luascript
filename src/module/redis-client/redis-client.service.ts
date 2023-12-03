import { BadRequestException, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { RedisConfig, TestData, TestKey, Tester } from '@/common';
import { RedisClient, Timer } from '@/core';

@Injectable()
export class RedisClientService implements OnApplicationBootstrap {
  private readonly redis: RedisClient;

  constructor() {
    this.redis = new RedisClient(new RedisConfig().getOptions());
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.redis.connect();
  }

  async testAll() {
    const keys = Object.values(TestKey);

    const timer = new Timer(async () => {
      const results: object[] = [];

      for (const key of keys) {
        const target = new TestData()[key](Tester.Client);

        await this.redis.set(target.key, JSON.stringify(target.value, null, 2));
        const result = await this.redis.get(target.key);

        if (result == null) {
          continue;
        }

        results.push(JSON.parse(result));
      }

      return results;
    });

    return timer.run(`redis-client-all`);
  }

  async testByKey(key: TestKey) {
    if (Object.values(TestKey).includes(key) === false) {
      throw new BadRequestException();
    }

    const target = new TestData()[key](Tester.Client);
    const timer = new Timer(async () => {
      await this.redis.set(target.key, JSON.stringify(target.value));
      return JSON.parse((await this.redis.get(target.key)) ?? 'null');
    });

    return timer.run(`redis-client-${key}`);
  }
}
