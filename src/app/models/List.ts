import { nanoid } from 'nanoid';
import { Task } from 'src/app/models/Task';

export class List {
  id: string;
  //   tasks: Task[] = [];

  constructor(
    public tasks: Task[] = [] as Task[],
    public title: string = '',
    public description: string = '',
    public colapsed?: boolean
  ) {
    if (title == '') {
      this.title = 'Mi lista';
    }
    // this.colapsed = false;
    this.tasks = tasks;
    this.id = List.generateId();
  }

  static generateId() {
    return nanoid();
  }

  static equalsTo(list1: List, list2: List) {
    if (list1.id !== list2.id) return false;
    if (list1.title !== list2.title) return false;
    if (!this.equalTasks(list1.tasks, list2.tasks)) return false;
    return true;
  }

  static equalTasks(tasks1: Task[], tasks2: Task[]) {
    console.log(tasks1.length);
    console.log(tasks2.length);

    if (tasks1.length !== tasks2.length) return false;

    for (let i = 0; i < tasks2.length; i++) {
      let id = tasks1[i].id == tasks2[i].id;
      let title = tasks1[i].title == tasks2[i].title;
      let desc = tasks1[i].description == tasks2[i].description;
      let pomo = tasks1[i].pomodoros == tasks2[i].pomodoros;
      if (!(id || title || desc || pomo)) return false;
    }

    return true;
  }
}
