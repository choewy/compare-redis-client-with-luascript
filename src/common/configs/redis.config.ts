import { RedisOptions } from 'ioredis';

import { ConfigService } from '@nestjs/config';

export class RedisConfig {
  private readonly configService = new ConfigService();

  private readonly HOST = this.configService.get<string>('REDIS_HOST');
  private readonly PORT = this.configService.get<string>('REDIS_PORT');
  private readonly USERNAME = this.configService.get<string>('REDIS_USERNAME');
  private readonly PASSWORD = this.configService.get<string>('REDIS_PASSWORD');
  private readonly DATABASE = this.configService.get<string>('REDIS_DATABASE');

  getOptions(): RedisOptions {
    return {
      host: this.HOST,
      port: Number(this.PORT ?? 6375),
      username: this.USERNAME,
      password: this.PASSWORD,
      db: Number(this.DATABASE ?? 0),
      lazyConnect: true,
    };
  }
}
