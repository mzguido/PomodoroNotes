import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from '../models/List';
import { PomodoroConfig } from '../models/PomodoroConfig';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  selectedTask: Task | undefined;
  lists: List[] = [];
  tasks: Task[] = [];
  pomodoroConfig: PomodoroConfig;
  $pomodoroConfig = new EventEmitter<PomodoroConfig>();

  constructor() {
    this.getLists();
    let config = localStorage.getItem('pomodoroConfig');
    this.pomodoroConfig =
      config !== null
        ? new PomodoroConfig(JSON.parse(config))
        : new PomodoroConfig();
    this.$pomodoroConfig.emit(this.pomodoroConfig);
    this.setTheme();
  }

  setTheme() {
    let theme = document.getElementById('main-container')!;
    theme.setAttribute('data-theme', this.pomodoroConfig.theme);
  }

  getConfig() {
    return this.pomodoroConfig;
  }
  get$Config() {
    return this.$pomodoroConfig;
  }

  getLists() {
    this.lists =
      localStorage.getItem('lists') !== null
        ? JSON.parse(localStorage.getItem('lists')!)
        : [];
    this.tasks =
      localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks')!)
        : [];
    this.checkTasks();
    console.log(this.lists);
    console.log(this.tasks);
  }

  checkTasks() {
    if (this.tasks.length > 0) {
      this.lists.push(new List(this.tasks));
      this.save();
    }
    localStorage.removeItem('tasks');
  }

  deleteList(listId: string) {
    this.lists = this.lists.filter((list) => list.id !== listId);
    this.save();
  }

  save() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  updateList(list: List) {
    this.lists.find((oldList) => oldList.id == list.id)!.title = list.title;
    console.log(this.lists);

    this.save();
  }
}
