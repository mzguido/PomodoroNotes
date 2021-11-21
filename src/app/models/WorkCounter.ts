import { Counter } from '../interfaces/Counter.interface';
import { BreakCounter } from './BreakCounter';
import { LongBreakCounter } from './LongBreakCounter';

export class WorkCounter implements Counter {
  static instance: Counter;
  // time = 0.05 * 60;
  time = 0.1 * 60;

  text = 'Estudio';
  i = 0;

  WorkCounter() {}

  static getInstance(): Counter {
    if (!this.instance) this.instance = new WorkCounter();
    return this.instance;
  }

  getNextCounter(): Counter {
    this.i++;
    if (this.i === 4) {
      this.i = 1;
      return LongBreakCounter.getInstance();
    }
    return BreakCounter.getInstance();
  }
}
