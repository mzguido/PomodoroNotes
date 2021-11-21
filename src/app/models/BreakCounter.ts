import { Counter } from '../interfaces/Counter.interface';
import { WorkCounter } from './WorkCounter';

export class BreakCounter implements Counter {
  static instance: Counter;
  // time = 0.05 * 60;
  time = 5 * 60;

  text = 'Pausa';

  WorkCounter() {}

  static getInstance(): Counter {
    if (!this.instance) this.instance = new BreakCounter();
    return this.instance;
  }

  getNextCounter(): Counter {
    return WorkCounter.getInstance();
  }
}
