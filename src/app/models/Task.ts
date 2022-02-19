import { nanoid } from 'nanoid';

export class Task {
  // title = 'Note title';
  // description = 'Description';
  // pomodoros = 1;
  completed = 0;
  id: string;
  // static idCount = 0;

  constructor(
    public title: string,
    public description: string,
    public pomodoros: number = 1
  ) {
    if (title == '') {
      this.title = 'Mi nota';
    }
    this.id = Task.generateId();
  }

  static generateId() {
    return nanoid();
  }

  // static getId() {
  //   Task.idCount++;
  //   return Task.idCount;
  // }

  // static setIdCount(id: number) {
  //   if (id !== null || id !== NaN) {
  //     Task.idCount = id;
  //   } else {
  //     Task.idCount = 0;
  //   }
  //   console.log(id);
  //   console.log(Task.idCount);
  // }
}
