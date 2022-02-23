import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss'],
})
export class YesNoComponent implements OnInit {
  @Input() message = '';
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.message);
  }

  confirm(value: boolean) {
    this.result.emit(value);
  }
}
