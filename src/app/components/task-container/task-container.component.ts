import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { List } from 'src/app/models/List';
import { Task } from 'src/app/models/Task';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit, AfterViewInit {
  @Input() list: List = {} as List;
  @Output() saveList = new EventEmitter<List>();

  title = '';
  description = '';
  pomodoros: number | undefined = undefined;
  // selectedTask: Task | undefined;

  messageTask = ``;
  messageList = ``;

  tasks!: Task[];
  //   = [
  //   new Task(this.title, this.description, this.pomodoros),
  //   new Task(this.title, this.description, this.pomodoros),
  // ];
  addingTask = false;
  edditingTask = false;
  edditingList = false;

  constructor(private pomodoroService: PomodoroService) {}
  ngAfterViewInit(): void {
    this.setColapsed();
  }

  ngOnInit(): void {
    // recuperacion de datos de local storage reemplazado por el operador ternario
    // this.tasks.push(new Task(this.title, this.description, this.pomodoros));
    // let tasksLocalStorage = localStorage.getItem('tasks');
    // if (tasksLocalStorage !== null) {
    //   this.tasks = JSON.parse(localStorage.getItem('tasks')!);
    // }

    // recuperacion de datos desde local storage
    // this.tasks =
    //   localStorage.getItem('tasks') !== null
    //     ? JSON.parse(localStorage.getItem('tasks')!)
    //     : [];
    // console.log(localStorage.getItem('tasks'));
    // this.pomodoroService.tasks = this.tasks;
    this.tasks = this.list!.tasks;
    // Datos hardcodeados
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
      this.pomodoroService.selectedTask!.title = this.title;
      this.pomodoroService.selectedTask!.description = this.description;
      this.pomodoroService.selectedTask!.pomodoros =
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
    // this.selectedTask = task;
    this.pomodoroService.selectedTask = task;
  }

  modalDeleteTask(task: Task) {
    this.selectTask(task);
    this.messageTask = `Desea eliminar la tarea "${
      this.pomodoroService.selectedTask!.title
    }" ?`;
  }

  deleteTask(value: boolean) {
    this.messageTask = '';

    if (!value) return;

    console.log(`task${this.pomodoroService.selectedTask!.id}`);
    let htmlTask = document.getElementById(
      `task${this.pomodoroService.selectedTask!.id}`
    );
    htmlTask!.classList.replace('animate__fadeInDown', 'animate__backOutDown');
    // delay para que se ejecute la animacion antes de eliminar el elemento
    setTimeout(() => {
      this.tasks = this.tasks.filter(
        (arrayTask) => arrayTask !== this.pomodoroService.selectedTask!
      );
      this.pomodoroService.tasks = this.tasks;
      // this.selectedTask = undefined;
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
    return this.pomodoroService.selectedTask == task;
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
    // localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.list!.tasks = this.tasks;
    this.saveList.emit(this.list);
  }

  getFromLS() {}

  // confirmDelete() {
  //   document
  //     .getElementById(`del-${this.list!.id}`)
  //     ?.classList.toggle('is-hidden');
  //   document.getElementById('black-background')?.classList.toggle('is-hidden');
  // }

  modalDeleteList() {
    this.messageList = `Desea eliminar la lista "${this.list.title}" ?`;
  }

  deleteList(value: boolean) {
    // this.confirmDelete();
    this.messageList = ``;
    if (!value) return;
    this.pomodoroService.deleteList(this.list!.id);
  }

  setColapsed() {
    if (this.list.colapsed)
      document.getElementById(this.list!.id)?.classList.toggle('is-hidden');
  }

  toggleColapse() {
    document.getElementById(this.list!.id)?.classList.toggle('is-hidden');
    this.list.colapsed = !this.list.colapsed;
    this.pomodoroService.saveOnlyLocal();
  }

  toggleEditPanel() {
    document
      .getElementById(`edit-${this.list!.id}`)
      ?.classList.toggle('is-hidden');
  }

  editList() {
    this.edditingList = true;
  }

  confirmList(conf: { list: List; confirm: boolean }) {
    this.edditingList = false;

    if (conf.confirm) {
      this.pomodoroService.updateList(conf.list);
    }
  }
}
