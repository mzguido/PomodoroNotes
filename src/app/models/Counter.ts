import { ICounter } from '../interfaces/Counter.interface';

export class Counter implements ICounter {
  static instance: ICounter;

  constructor(public time: number, public text: string) {}
}
