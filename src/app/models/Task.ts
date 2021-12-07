export class Task {
  // title = 'Note title';
  // description = 'Description';
  // pomodoros = 1;
  completed = 0;

  constructor(
    public title: string,
    public description: string,
    public pomodoros: number
  ) {}
}
