import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginEventService {
  @Output() LoginSignupEvent = new EventEmitter();
  constructor() {}

  SendSignupEvent() {
    this.LoginSignupEvent.emit();
  }
}
