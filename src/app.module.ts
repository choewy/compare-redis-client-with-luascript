import { BeforeApplicationShutdown, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { RedisConfig } from '@/common';
import { RedisClient } from '@/core';
import { RedisClientModule, RedisLuascriptModule } from '@/module';

@Module({
  imports: [ConfigModule.forRoot(), RedisClientModule, RedisLuascriptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private async flushdb() {
    const redis = new RedisClient(new RedisConfig().getOptions());
    await redis.connect();
    await redis.flushdb();

    redis.disconnect();
  }

  async onApplicationBootstrap() {
    await this.flushdb();
  }

  async beforeApplicationShutdown() {
    await this.flushdb();
  }
}
