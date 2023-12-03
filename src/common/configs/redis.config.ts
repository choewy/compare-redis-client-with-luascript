import { RedisClientOptions } from 'redis';

import { ConfigService } from '@nestjs/config';

export class RedisConfig {
  private readonly configService = new ConfigService();

  private readonly URL = this.configService.get<string>('REDIS_URL');
  private readonly USERNAME = this.configService.get<string>('REDIS_USERNAME');
  private readonly PASSWORD = this.configService.get<string>('REDIS_PASSWORD');
  private readonly DATABASE = this.configService.get<string>('REDIS_DATABASE');

  getClientOptions(): RedisClientOptions {
    return {
      url: this.URL,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: Number(this.DATABASE ?? 0),
    };
  }
}
