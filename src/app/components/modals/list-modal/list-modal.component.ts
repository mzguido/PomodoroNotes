import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/models/List';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent implements OnInit {
  @Input() list = {} as List;
  @Input() isNew!: boolean;

  @Output() newList: EventEmitter<{ list: List; confirm: boolean }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.isNew) {
      this.list = new List();
      this.list.title = '';
    }
  }

  confirmList() {
    this.list.title = this.list.title == '' ? 'Mi lista' : this.list.title;
    this.newList.emit({ list: this.list, confirm: true });
  }

  cancelList() {
    this.newList.emit({ list: this.list, confirm: false });
  }
}
