export interface Counter {
  time: number;
  text: string;
  getNextCounter(): Counter;
}
