import { ICounter } from '../interfaces/Counter.interface';
import { BreakCounter } from './BreakCounter';
import { Counter } from './Counter';
import { LongBreakCounter } from './LongBreakCounter';
import { WorkCounter } from './WorkCounter';

export class CounterController {
  static instance: CounterController;
  workCounter = new Counter(25 * 60, 'Work');
  breakCounter = new Counter(5 * 60, 'Break');
  longBreakCounter = new Counter(15 * 60, 'Long break');
  counters = [this.workCounter, this.breakCounter, this.longBreakCounter];
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
        this.currentCounter = this.longBreakCounter;
      } else {
        this.currentCounter = this.breakCounter;
      }
    } else {
      this.currentCounter = this.workCounter;
    }
    return this.currentCounter;
  }
}
