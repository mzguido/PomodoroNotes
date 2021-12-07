import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  selectedTask: Task | undefined;
  tasks: Task[] = [];
  constructor() {}
}
