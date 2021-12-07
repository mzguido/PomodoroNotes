import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit {
  title = 'Mi nota';
  description = 'Esta es mi primera nota';
  pomodoros = 6;
  selectedTask: Task | undefined;

  tasks!: Task[];
  //   = [
  //   new Task(this.title, this.description, this.pomodoros),
  //   new Task(this.title, this.description, this.pomodoros),
  // ];
  addingTask = false;

  constructor(private pomodoroService: PomodoroService) {}

  ngOnInit(): void {
    this.tasks = this.pomodoroService.tasks;
    this.tasks.push(new Task(this.title, this.description, this.pomodoros));
  }

  newTask() {
    this.addingTask = true;
  }

  confirmTask() {
    this.tasks.push(new Task(this.title, this.description, this.pomodoros));
    this.addingTask = false;
  }
  cancelTask() {
    this.addingTask = false;
  }

  selectTask(task: Task) {
    this.selectedTask = task;
    this.pomodoroService.selectedTask = task;
  }

  isSelected(task: Task) {
    return this.selectedTask == task;
  }
}
