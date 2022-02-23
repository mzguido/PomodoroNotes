import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ICounter } from 'src/app/interfaces/Counter.interface';
import { Counter } from 'src/app/models/Counter';
import { CounterController } from 'src/app/models/CounterController';
import { PomodoroConfig } from 'src/app/models/PomodoroConfig';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  // counterController = CounterController.getInstance();
  // counter = this.counterController.currentCounter;
  $pomodoroConfig!: Observable<PomodoroConfig>;
  pomodoroConfig!: PomodoroConfig;

  workCounter = new Counter(
    this.pomodoroService.pomodoroConfig.work * 60,
    'Work'
  );
  breakCounter = new Counter(
    this.pomodoroService.pomodoroConfig.break * 60,
    'Break'
  );
  longBreakCounter = new Counter(
    this.pomodoroService.pomodoroConfig.longBreak * 60,
    'Long break'
  );
  counters = [this.workCounter, this.breakCounter, this.longBreakCounter];
  currentCounter = this.workCounter;
  i = 0;

  time = this.currentCounter.time;
  mins!: string;
  secs!: string;

  interval!: any;
  progress = 0;

  alarm = new Audio(`../../../assets/sounds/Cyclist.ogg`);

  constructor(
    private titleService: Title,
    private pomodoroService: PomodoroService
  ) {
    this.getMinsAndSecs();
    this.pomodoroConfig = this.pomodoroService.pomodoroConfig;
  }

  ngOnInit(): void {
    console.log(this.time);
    this.pomodoroService.get$Config().subscribe((config) => {
      this.workCounter.time = config.work * 60;
      this.breakCounter.time = config.break * 60;
      this.longBreakCounter.time = config.longBreak * 60;
      this.pomodoroConfig = config;
      this.time = this.currentCounter.time;
      this.getMinsAndSecs();
      console.log('se cambio el timer');
    });
  }

  updateTime = () => {
    if (this.time == 0) {
      this.autoStart();
      this.alarm.play();
      this.setCounter(this.getNextCounter());
    } else {
      this.time--;
    }
    this.getMinsAndSecs();
    this.progress =
      ((this.currentCounter.time - this.time) / this.currentCounter.time) * 100;
  };

  initInterval() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getMinsAndSecs() {
    let mins = Math.floor(this.time / 60);
    let secs = this.time % 60;

    this.mins = mins < 10 ? '0' + mins.toString() : mins.toString();
    this.secs = secs < 10 ? '0' + secs.toString() : secs.toString();
    this.setTitle(`${this.mins}:${this.secs} - ${this.currentCounter.text}`);
  }

  setCounter(c: ICounter) {
    this.autoStart();
    this.currentCounter = c;
    this.time = this.currentCounter.time;
    this.getMinsAndSecs();
  }

  isActive(counter: ICounter) {
    return counter === this.currentCounter;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getNextCounter() {
    if (this.currentCounter == this.workCounter) {
      this.i++;
      if (this.pomodoroService.selectedTask !== undefined) {
        this.pomodoroService.selectedTask.completed++;
        this.pomodoroService.save();
        // localStorage.setItem(
        //   'tasks',
        //   JSON.stringify(this.pomodoroService.tasks)
        // );
      }
      if (this.i === 4) {
        this.i = 1;
        this.currentCounter = this.longBreakCounter;
      } else {
        this.currentCounter = this.breakCounter;
      }
    } else {
      this.currentCounter = this.workCounter;
    }
    return this.currentCounter;
  }

  autoStart() {
    this.progress = 0;
    this.stopInterval();
    if (this.pomodoroConfig.autoStart) this.initInterval();
  }
}
