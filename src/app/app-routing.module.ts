import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';

const routes: Routes = [
  { path: '', component: PomodoroComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
