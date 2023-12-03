import { TimerResultDto } from './timer.dto';

export class Timer {
  async estimate<T>(run: () => Promise<T> | T) {
    const start = Date.now();
    const result = await run();
    const end = Date.now();

    return new TimerResultDto<T>(start, end, result);
  }
}
