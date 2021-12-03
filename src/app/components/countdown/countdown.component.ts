import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ICounter } from 'src/app/interfaces/Counter.interface';
import { CounterController } from 'src/app/models/CounterController';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  counterController = CounterController.getInstance();
  counter = this.counterController.currentCounter;

  time = this.counter.time;
  mins!: string;
  secs!: string;

  interval!: any;
  progress = 0;

  alarm = new Audio(`../../../assets/sounds/Cyclist.ogg`);

  constructor(private titleService: Title) {
    this.getMinsAndSecs();
  }

  ngOnInit(): void {
    console.log(this.time);
  }

  updateTime = () => {
    if (this.time == 0) {
      this.stopInterval();
      this.alarm.play();
      this.setCounter(this.counterController.getNextCounter());
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
    this.setTitle(`${this.counter.text} - ${this.mins}:${this.secs}`);
  }

  setCounter(c: ICounter) {
    this.counter = c;
    this.time = this.counter.time;
    this.getMinsAndSecs();
  }

  isActive(counter: ICounter) {
    return counter === this.counter;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
