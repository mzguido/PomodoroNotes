import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Counter } from 'src/app/interfaces/Counter.interface';
import { BreakCounter } from 'src/app/models/BreakCounter';
import { LongBreakCounter } from 'src/app/models/LongBreakCounter';
import { WorkCounter } from 'src/app/models/WorkCounter';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  counter = WorkCounter.getInstance();
  counters = [
    WorkCounter.getInstance(),
    BreakCounter.getInstance(),
    LongBreakCounter.getInstance(),
  ];

  time = this.counter.time;
  mins!: string;
  secs!: string;

  interval!: any;
  progress = 0;

  alarm = new Audio(`../../../assets/sounds/Cyclist.ogg`);

  constructor() {
    this.getMinsAndSecs();
  }

  ngOnInit(): void {
    console.log(this.time);
  }

  updateTime = () => {
    if (this.time == 0) {
      this.stopInterval();
      this.alarm.play();
      this.setCounter(this.counter.getNextCounter());
    } else {
      this.time--;
    }
    this.getMinsAndSecs();
    this.progress = ((this.counter.time - this.time) / this.counter.time) * 100;
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
  }

  setCounter(c: Counter) {
    this.counter = c;
    this.time = this.counter.time;
    this.getMinsAndSecs();
  }

  isActive(counter: Counter) {
    return counter === this.counter;
  }
}
