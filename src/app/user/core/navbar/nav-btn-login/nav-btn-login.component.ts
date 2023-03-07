import { LoginComponent } from './../../../feature/login/login.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-btn-login',
  templateUrl: './nav-btn-login.component.html',
  styleUrls: ['./nav-btn-login.component.scss'],
})
export class NavBtnLoginComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  constructor(public dialog: MatDialog) {}

  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-white';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }
}
