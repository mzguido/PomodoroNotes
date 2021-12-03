import { ICounter } from '../interfaces/Counter.interface';
import { BreakCounter } from './BreakCounter';
import { LongBreakCounter } from './LongBreakCounter';

export class WorkCounter implements ICounter {
  static instance: ICounter;
  // time = 0.05 * 60;
  time = 0.1 * 60;

  text = 'Estudio';
  i = 0;

  WorkCounter() {}

  static getInstance(): ICounter {
    if (!this.instance) this.instance = new WorkCounter();
    return this.instance;
  }

  getNextCounter(): ICounter {
    this.i++;
    if (this.i === 4) {
      this.i = 1;
      return LongBreakCounter.getInstance();
    }
    return BreakCounter.getInstance();
  }
}
