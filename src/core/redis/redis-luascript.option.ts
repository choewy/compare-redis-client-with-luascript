import { readFileSync } from 'fs';

export class RedisLuascriptOption {
  constructor(public command: string, private numberOfKeys: number) {}

  get definition() {
    return {
      lua: readFileSync(`./luascripts/${this.command}.lua`).toString(),
      numberOfKeys: this.numberOfKeys,
    };
  }
}
