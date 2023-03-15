import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginChangerService {
  @Output() loginChangeEvent = new EventEmitter<string>();
  constructor() {}

  sendEvent() {
    this.loginChangeEvent.emit();
  }
}
