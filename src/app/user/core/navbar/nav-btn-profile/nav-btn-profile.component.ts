import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginChangerService } from '../../services/login-changer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-btn-profile',
  templateUrl: './nav-btn-profile.component.html',
  styleUrls: ['./nav-btn-profile.component.scss'],
})
export class NavBtnProfileComponent {
  constructor(
    private logOutEventEmitter: LoginChangerService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  navigateProfile() {
    this.route.navigate(['/profile', localStorage.getItem('userId')]);
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['/']);
    this.logOutEventEmitter.sendEvent();
    this.openSnackBar('Log Out Sucess');
  }

  openSnackBar(msg: string, cls = 'snackbar') {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      panelClass: [cls],
    });
  }
}
