export class PomodoroConfig {
  work = 25;
  break = 5;
  longBreak = 15;
  theme = 'green';
  style = 'normal';
  autoStart = true;

  constructor(config?: PomodoroConfig) {
    this.work = config?.work || 25;
    this.break = config?.break || 5;
    this.longBreak = config?.longBreak || 15;
    this.theme = config?.theme || 'green';
    this.style = config?.style || 'normal';
    this.autoStart = config?.autoStart == undefined ? true : config?.autoStart;
    console.log({ config });
    console.log(this);
  }
}
