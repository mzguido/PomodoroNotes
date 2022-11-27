import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { List } from 'src/app/models/List';
import { PomodoroService } from 'src/app/services/pomodoro.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit {
  tasks!: Task[];
  // lists!: List[];

  title: string = '';
  description: string = '';
  addingList = false;
  edditingList = false;
  constructor(public pomodoroService: PomodoroService) {}

  ngOnInit(): void {
    // this.getLists();
  }

  // getLists() {
  //   this.lists = this.lists;
  // }

  get lists() {
    return this.pomodoroService.lists;
  }

  saveListLS(newList: List) {
    let index = this.lists.findIndex((list) => list.id === newList.id);
    if (index >= 0) {
      this.lists[index] = newList;
      this.save();
    }
  }

  save() {
    // localStorage.setItem('lists', JSON.stringify(this.lists));
    this.pomodoroService.save();
  }

  newList() {
    this.edditingList = false;
    this.addingList = true;
  }

  confirmList2() {
    if (this.addingList) {
      this.lists.push(new List([] as Task[], this.title, this.description));
      this.addingList = false;
      // } else {
      //   this.selectedTask!.title = this.title;
      //   this.selectedTask!.description = this.description;
      //   this.selectedTask!.pomodoros =
      //     this.pomodoros == undefined ? 1 : this.pomodoros;
      //   this.edditingTask = false;
      // }
      this.save();
      this.resetInputs();
    }
  }

  confirmList(conf: { list: List; confirm: boolean }) {
    if (conf.confirm) {
      this.lists.push(conf.list);
      this.save();
    }
    this.addingList = false;
  }
  resetInputs() {
    this.title = '';
    this.description = '';
  }
}
