import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { ListModalComponent } from './components/modals/list-modal/list-modal.component';
import { YesNoComponent } from './comnponents/modals/yes-no/yes-no.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    NavbarComponent,
    TaskContainerComponent,
    TaskComponent,
    ConfigPanelComponent,
    PomodoroComponent,
    ListModalComponent,
    YesNoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
