import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit {
  title = '';
  description = '';
  pomodoros: number | undefined = undefined;
  selectedTask: Task | undefined;

  tasks!: Task[];
  //   = [
  //   new Task(this.title, this.description, this.pomodoros),
  //   new Task(this.title, this.description, this.pomodoros),
  // ];
  addingTask = false;
  edditingTask = false;

  constructor(private pomodoroService: PomodoroService) {}

  ngOnInit(): void {
    // recuperacion de datos de local storage reemplazado por el operador ternario
    // this.tasks.push(new Task(this.title, this.description, this.pomodoros));
    // let tasksLocalStorage = localStorage.getItem('tasks');
    // if (tasksLocalStorage !== null) {
    //   this.tasks = JSON.parse(localStorage.getItem('tasks')!);
    // }

    // recuperacion de datos desde local storage
    this.tasks =
      localStorage.getItem('tasks') !== null
        ? JSON.parse(localStorage.getItem('tasks')!)
        : [];
    console.log(localStorage.getItem('tasks'));
    this.pomodoroService.tasks = this.tasks;
    // Datos hardodeados
    // this.tasks = JSON.parse(
    //   `[{"title":"Mi notaaaa","description":"","pomodoros":1,"completed":0,"id":2},{"title":"Mi nota","description":"","pomodoros":1,"completed":0}]`
    // );

    this.setTaskId();

    // if (this.tasks.length > 0) {
    //   Task.setIdCount(this.tasks[this.tasks.length - 1].id);
    // }
    // this.pomodoroService.tasks = this.tasks;
  }

  // Funcion para asignar id a las tareas viejas que no tenian o que tienen id numerico
  setTaskId() {
    for (let task of this.tasks) {
      if (task.hasOwnProperty('id') && typeof task.id === 'string') continue;
      task.id = Task.generateId();
    }
  }

  newTask() {
    this.edditingTask = false;
    this.addingTask = true;
  }

  confirmTask() {
    if (this.addingTask) {
      this.tasks.push(new Task(this.title, this.description, this.pomodoros));
      this.addingTask = false;
    } else {
      this.selectedTask!.title = this.title;
      this.selectedTask!.description = this.description;
      this.selectedTask!.pomodoros =
        this.pomodoros == undefined ? 1 : this.pomodoros;
      this.edditingTask = false;
    }
    this.saveToLS();
    this.resetInputs();
  }

  cancelTask() {
    this.addingTask = false;
    this.edditingTask = false;
    this.resetInputs();
  }

  selectTask(task: Task) {
    this.selectedTask = task;
    this.pomodoroService.selectedTask = task;
  }

  deleteTask(task: Task) {
    console.log(`task${task.id}`);
    let htmlTask = document.getElementById(`task${task.id}`);
    htmlTask!.classList.replace('animate__fadeInDown', 'animate__backOutDown');
    // delay para que se ejecute la animacion antes de eliminar el elemento
    setTimeout(() => {
      this.tasks = this.tasks.filter((arrayTask) => arrayTask !== task);
      this.pomodoroService.tasks = this.tasks;
      this.selectedTask = undefined;
      this.pomodoroService.selectedTask = undefined;
      this.saveToLS();
    }, 500);
  }

  editTask(task: Task) {
    this.title = task.title;
    this.description = task.description;
    this.pomodoros = task.pomodoros;
    this.addingTask = false;
    this.edditingTask = true;
  }

  isSelected(task: Task) {
    return this.selectedTask == task;
  }

  resetInputs() {
    this.title = '';
    this.description = '';
    this.pomodoros = undefined;
  }

  isCompleted(task: Task) {
    return task.pomodoros / task.completed <= 1;
  }

  saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getFromLS() {}
}
