import { Redis } from 'ioredis';

export class RedisClient extends Redis {
  async executeLuascript<T>(command: string, ...args: any[]) {
    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === 'object') {
        args[i] = JSON.stringify(args[i]);
      }
    }

    try {
      const result = await this[command](...args);

      return JSON.parse(result) as T;
    } catch (e) {
      console.error(e);

      return null;
    }
  }
}
