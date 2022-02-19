import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PomodoroConfig } from '../models/PomodoroConfig';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  selectedTask: Task | undefined;
  tasks: Task[] = [];
  pomodoroConfig: PomodoroConfig;
  $pomodoroConfig = new EventEmitter<PomodoroConfig>();

  constructor() {
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
}
