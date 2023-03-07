import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private dialog: MatDialog
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onNoClick();
  }

  openLogin() {
    this.dialog.open(LoginComponent);
    this.onNoClick();
  }
}
