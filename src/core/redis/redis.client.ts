import { Redis } from 'ioredis';

export class RedisClient extends Redis {
  async executeLuascript<T>(command: string, ...argv: any[]) {
    for (let i = 0; i < argv.length; i++) {
      if (typeof argv[i] === 'object') {
        argv[i] = JSON.stringify(argv[i]);
      }
    }

    try {
      const result = await this[command](...argv);

      return JSON.parse(result) as T;
    } catch (e) {
      console.error(e);

      return null;
    }
  }
}
