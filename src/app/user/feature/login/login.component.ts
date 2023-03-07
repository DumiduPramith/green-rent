import { LoginEventService } from './../services/signal/login-event.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.onClose();
  }

  LoadSignup() {
    this.onClose();
    const dialogref = this.dialog.open(SignupComponent);
  }

  onClose() {
    this.dialogRef.close();
  }
}
