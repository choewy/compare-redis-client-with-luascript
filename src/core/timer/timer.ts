import { TimerResultDto } from './timer.dto';

export class Timer<T> {
  constructor(private readonly runner: () => Promise<T> | T) {}

  async run() {
    const start = Date.now();
    const result = await this.runner();
    const end = Date.now();

    return new TimerResultDto<T>(start, end, result);
  }
}
