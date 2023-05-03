import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdcardSectionRefreshService {
  @Output() refreshEvent = new EventEmitter<string>();
  constructor() {}

  sendRefreshEvent() {
    this.refreshEvent.emit();
  }
}
