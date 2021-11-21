import { Counter } from '../interfaces/Counter.interface';
import { BreakCounter } from './BreakCounter';
import { LongBreakCounter } from './LongBreakCounter';
import { WorkCounter } from './WorkCounter';

export class CounterController {
  static instance: CounterController;
  workCounter = WorkCounter.getInstance();
  breakCounter = BreakCounter.getInstance();
  longBreakCounter = LongBreakCounter.getInstance();
  currentCounter = this.workCounter;
  i = 0;

  CounterController() {}

  static getInstance(): CounterController {
    if (!this.instance) this.instance = new CounterController();
    return this.instance;
  }

  getNextCounter() {
    if (this.currentCounter == this.workCounter) {
      this.i++;
      if (this.i === 4) {
        this.i = 1;
        return LongBreakCounter.getInstance();
      }
      return BreakCounter.getInstance();
    }
  }
}
