export class TimerResultDto<T> {
  ms: number;
  result: T;

  constructor(start: number, end: number, result: T) {
    this.ms = end - start;
    this.result = result;
  }
}
