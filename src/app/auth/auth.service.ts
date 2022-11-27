import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  authState,
} from '@angular/fire/auth';

import { traceUntilFirst } from '@angular/fire/performance';

import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;
  isAuth = false;

  // constructor(public auth: AngularFireAuth) {}
  constructor(public auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.isAuth = isLoggedIn;
        });
    }
  }

  // login() {
  //   this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }
  // logout() {
  //   this.auth.signOut();
  // }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    return await signOut(this.auth);
  }
}
