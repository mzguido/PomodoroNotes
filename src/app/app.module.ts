import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
import { LoginComponent } from './pages/login/login.component';
// import { FirebaseAppModule } from '@angular/fire/app';

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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

    // AngularFireModule.initializeApp(environment.firebase),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerImmediately',
    // }),
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
