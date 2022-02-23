import { nanoid } from 'nanoid';
import { Task } from 'src/app/models/Task';

export class List {
  id: string;
  //   tasks: Task[] = [];

  constructor(
    public tasks: Task[] = [] as Task[],
    public title: string = '',
    public description: string = '',
    public colapsed: boolean = false
  ) {
    if (title == '') {
      this.title = 'Mi lista';
    }
    this.tasks = tasks;
    this.id = List.generateId();
  }

  static generateId() {
    return nanoid();
  }
}
