import { Injectable } from '@angular/core';

import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  DocumentReference,
  docData,
  DocumentData,
  updateDoc,
  UpdateData,
  setDoc,
} from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { List } from '../models/List';

export interface UserData {
  lists: List[];
  testField: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private itemDoc!: AngularFirestoreDocument<List>;
  $item: Observable<DocumentData> | null = null;
  item: DocumentData = {};
  user: User | null = null;

  docRef!: DocumentReference;

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.getUser();
  }

  getUser() {
    this.authService.user.subscribe((fireUser) => {
      this.user = fireUser;
      console.log(fireUser);
      this.getUserData();
      // this.item = this.getUserData();
      // this.item.subscribe((data) => console.log(data));
    });
  }

  getUserData() {
    const users = collection(this.firestore, `users`);
    this.docRef = doc(users, this.user?.uid);
    this.item = docData(this.docRef).pipe(take(2));
    this.item.subscribe((data: any) => {
      if (data) {
        console.log('existe el usuario: ' + this.user?.uid);
        console.log(data);
      } else {
        let userData: UserData = {} as UserData;
        userData.lists = JSON.parse(localStorage.getItem('lists')!);
        console.log('no existe el usuario:' + this.user?.uid);
        setDoc(this.docRef, userData);
      }
    });
  }
}
