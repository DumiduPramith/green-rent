import { LoginInterface } from './../interfaces/login.interface';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { LoginChangerService } from '../../core/services/login-changer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //@ts-ignore
  loginHttpSubscription: Subscription;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private loginHttp: LoginService,
    private loginEventEmitter: LoginChangerService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    const raw_data = this.loginForm.getRawValue();
    let data: LoginInterface = {
      role: 'user',
      email: raw_data.email ? raw_data.email : '',
      password: raw_data.password ? raw_data.password : '',
    };
    this.loginHttpSubscription = this.loginHttp.Login(data).subscribe({
      next: (response: any) => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', response.user.userId);
          localStorage.setItem('username', response.user.userName);
          this.loginEventEmitter.sendEvent();
          this.openSnackBar('Login Success');
          this.onClose();
        }
      },
      error: (err: any) => {
        if (err.status == 401) {
          this.loginForm.setErrors({ invalidCredential: true });
        }
        console.log('error occured ', err);
      },
      complete: () => {},
    });
  }

  LoadSignup() {
    this.onClose();
    const dialogref = this.dialog.open(SignupComponent);
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.loginHttpSubscription) {
      this.loginHttpSubscription.unsubscribe();
    }
  }

  openSnackBar(msg: string, cls = 'snackbar') {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      panelClass: [cls],
    });
  }
}
