import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { TimerResultDto } from './timer.dto';

export class Timer<T> {
  constructor(
    private readonly runner: () => Promise<T> | T,
    private enableMsLog = true,
    private enableResultLog = false,
  ) {}

  private saveLogs(name: string, timerResult: TimerResultDto<T>) {
    const dirname = './logs';

    if (existsSync(dirname) === false) {
      mkdirSync(dirname);
    }

    if (this.enableMsLog) {
      this.saveMsLog(name, timerResult.ms);
    }

    if (this.enableResultLog) {
      this.saveResultLog(name, timerResult.result);
    }
  }

  private saveMsLog(name: string, ms: number) {
    let rows = [{ ms }];

    const filename = `./logs/${name}-ms.json`;

    if (existsSync(filename)) {
      rows = JSON.parse(readFileSync(filename, 'utf-8').toString());
      rows.push({ ms });
    }

    writeFileSync(filename, JSON.stringify(rows, null, 2), 'utf-8');
  }

  private saveResultLog(name: string, result: T) {
    let rows = [{ result }];

    const filename = `./logs/${name}-result.json`;

    if (existsSync(filename)) {
      rows = JSON.parse(readFileSync(filename, 'utf-8').toString());
      rows.push({ result });
    }

    writeFileSync(filename, JSON.stringify(rows, null, 2), 'utf-8');
  }

  async run(name: string) {
    const start = Date.now();
    const result = await this.runner();
    const end = Date.now();

    const timerResult = new TimerResultDto<T>(start, end, result);

    this.saveLogs(name, timerResult);

    return timerResult;
  }
}
