import { ICounter } from '../interfaces/Counter.interface';
import { WorkCounter } from './WorkCounter';

export class LongBreakCounter implements ICounter {
  static instance: ICounter;
  time = 10 * 60;
  text = 'Descanso';

  WorkCounter() {}

  static getInstance(): ICounter {
    if (!this.instance) this.instance = new LongBreakCounter();
    return this.instance;
  }

  getNextCounter(): ICounter {
    return WorkCounter.getInstance();
  }
}
