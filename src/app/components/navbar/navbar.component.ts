import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  showLogIn = false;
  public user: User | null = null;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  switchTheme() {
    let theme = document.getElementById('main-container')!;

    if (theme.getAttribute('data-theme') == 'green')
      theme.setAttribute('data-theme', 'blue');
    else theme.setAttribute('data-theme', 'green');
  }

  toggleConfigPanel() {
    let panel = document.getElementsByClassName('modal')[0];
    panel.classList.toggle('is-active');
  }

  toggleBurgerMenu() {
    let menu = document.getElementsByClassName('navbar-menu')[0];
    let burger = document.getElementsByClassName('navbar-burger')[0];
    menu.classList.toggle('is-active');
    burger.classList.toggle('is-active');
  }

  toggleLogIn() {
    this.showLogIn = !this.showLogIn;
  }
}
