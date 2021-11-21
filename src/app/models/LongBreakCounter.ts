import { Counter } from '../interfaces/Counter.interface';
import { WorkCounter } from './WorkCounter';

export class LongBreakCounter implements Counter {
  static instance: Counter;
  time = 10 * 60;
  text = 'Descanso';

  WorkCounter() {}

  static getInstance(): Counter {
    if (!this.instance) this.instance = new LongBreakCounter();
    return this.instance;
  }

  getNextCounter(): Counter {
    return WorkCounter.getInstance();
  }
}
