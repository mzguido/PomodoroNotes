import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private pomodoroService: PomodoroService
  ) {}

  ngOnInit(): void {}

  get isAuth() {
    return this.authService.isAuth;
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.pomodoroService.getUser())
      .catch((e) => console.log(e.message));
  }

  logOut() {
    this.authService.logout();
  }
}
