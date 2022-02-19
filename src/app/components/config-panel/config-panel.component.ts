import { Component, OnInit } from '@angular/core';
import { PomodoroConfig } from 'src/app/models/PomodoroConfig';
import { PomodoroService } from 'src/app/services/pomodoro.service';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
})
export class ConfigPanelComponent implements OnInit {
  work!: number;
  longBreak!: number;
  break!: number;
  theme!: string;
  pomodoroConfig: PomodoroConfig;

  constructor(private pomodoroService: PomodoroService) {
    this.pomodoroConfig = this.pomodoroService.getConfig();
  }

  ngOnInit(): void {}

  toggleConfigPanel() {
    let panel = document.getElementsByClassName('modal')[0];
    panel.classList.toggle('is-active');
  }

  normalStyle() {
    return (
      this.pomodoroConfig?.style == 'normal' ||
      !this.pomodoroConfig.hasOwnProperty('style')
    );
  }

  setStyle(style: string) {
    this.pomodoroConfig.style = style;
  }

  setTheme(themeString: string) {
    let theme = document.getElementById('main-container')!;
    theme.setAttribute('data-theme', themeString);
    this.pomodoroConfig.theme = themeString;
    localStorage.setItem('pomodoroConfig', JSON.stringify(this.pomodoroConfig));
  }

  saveConfig() {
    localStorage.setItem('pomodoroConfig', JSON.stringify(this.pomodoroConfig));
    this.pomodoroService.$pomodoroConfig.emit(this.pomodoroConfig);
    this.toggleConfigPanel();
  }
}
