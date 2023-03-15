import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginChangerService } from '../../services/login-changer.service';

@Component({
  selector: 'app-nav-btn-profile',
  templateUrl: './nav-btn-profile.component.html',
  styleUrls: ['./nav-btn-profile.component.scss'],
})
export class NavBtnProfileComponent {
  constructor(
    private logOutEventEmitter: LoginChangerService,
    private route: Router
  ) {}

  logOut() {
    localStorage.clear();
    this.route.navigate(['/']);
    this.logOutEventEmitter.sendEvent();
  }
}
