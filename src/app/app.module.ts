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

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    NavbarComponent,
    TaskContainerComponent,
    TaskComponent,
    ConfigPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
