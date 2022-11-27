import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/List';
import { PomodoroConfig } from '../models/PomodoroConfig';
import { Task } from '../models/Task';

import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  doc,
  DocumentReference,
  docData,
  DocumentData,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import { User } from 'firebase/auth';

import { AuthService } from '../auth/auth.service';

export interface UserData {
  lists: List[];
  testField: string;
}

export interface DataController {
  getData(): any;
  saveData(): any;
  updateData(): any;
  deleteData(): any;
}

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  selectedTask: Task | undefined;
  lists: List[] = [];
  tasks: Task[] = [];
  pomodoroConfig: PomodoroConfig;
  $pomodoroConfig = new EventEmitter<PomodoroConfig>();

  private itemDoc!: AngularFirestoreDocument<List>;
  $item: Observable<DocumentData> | null = null;
  item: DocumentData = {};
  user: User | null = null;

  docRef!: DocumentReference;

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.getLists();
    let config = localStorage.getItem('pomodoroConfig');
    this.pomodoroConfig =
      config !== null
        ? new PomodoroConfig(JSON.parse(config))
        : new PomodoroConfig();
    this.$pomodoroConfig.emit(this.pomodoroConfig);
    this.setTheme();

    this.getUser();
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
    this.saveFirestore();
  }

  saveOnlyLocal() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  updateList(list: List) {
    this.lists.find((oldList) => oldList.id == list.id)!.title = list.title;
    console.log(this.lists);

    this.save();
  }

  // firebase data

  getUser() {
    this.authService.user.subscribe((fireUser) => {
      this.user = fireUser;
      console.log(fireUser);
      if (fireUser) this.getUserData();
      // this.item = this.getUserData();
      // this.item.subscribe((data) => console.log(data));
    });
  }

  getUserData() {
    const users = collection(this.firestore, `users`);
    this.docRef = doc(users, this.user?.uid);
    // this.item = docData(this.docRef).pipe(take(2)); para recibir solo 2 actulizaciones
    this.item = docData(this.docRef);

    this.item.subscribe((data: UserData) => {
      if (data) {
        console.log('existe el usuario: ' + this.user?.uid);
        console.log(data);
        let localLists: List[];
        localLists = JSON.parse(localStorage.getItem('lists')!);

        if (data.lists.length > 0) {
          if (localLists.length > 0) {
            console.log(List.equalsTo(localLists[0], data.lists[0]));
            if (List.equalsTo(localLists[0], data.lists[0])) return;
          }
          this.lists = data.lists;
          this.lists.map((list) => {
            list.colapsed = localLists.find(
              (localList) => localList.id == list.id
            )?.colapsed;
          });
        }
      } else {
        // let userData: UserData = {} as UserData;
        // userData.lists = JSON.parse(localStorage.getItem('lists')!);
        console.log('no existe el usuario:' + this.user?.uid);

        let userData = {} as { lists: any[] };
        userData.lists = JSON.parse(localStorage.getItem('lists')!);

        //  userData.lists = this.lists;

        userData.lists = userData.lists.map((list) => {
          delete list.colapsed;
          list.tasks = list.tasks.map((task: any) => (task = { ...task }));
          return (list = { ...list });
        });
        console.log(userData.lists);

        setDoc(this.docRef, userData);
      }
    });
  }

  saveFirestore() {
    if (!this.docRef) return;
    let userData = {} as { lists: any[] };
    userData.lists = this.lists;
    userData.lists = userData.lists.map((list) => {
      delete list.colapsed;
      list.tasks = list.tasks.map((task: any) => (task = { ...task }));
      return (list = { ...list });
    });
    updateDoc(this.docRef, userData);
  }
}
