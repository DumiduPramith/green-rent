import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionChangeEventService {
  @Output() selectionEvent = new EventEmitter();
  constructor() {}

  selectionChangeEventEmit() {
    this.selectionEvent.emit();
  }
}
