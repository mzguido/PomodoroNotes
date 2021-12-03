import { ICounter } from '../interfaces/Counter.interface';
import { WorkCounter } from './WorkCounter';

export class BreakCounter implements ICounter {
  static instance: ICounter;
  // time = 0.05 * 60;
  time = 5 * 60;

  text = 'Pausa';

  WorkCounter() {}

  static getInstance(): ICounter {
    if (!this.instance) this.instance = new BreakCounter();
    return this.instance;
  }

  getNextCounter(): ICounter {
    return WorkCounter.getInstance();
  }
}
