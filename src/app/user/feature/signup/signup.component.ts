import { Subscription } from 'rxjs';
import { RegisterInterface } from './../interfaces/register.interface';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterService } from '../services/register.service';
import Validation from '../utils/validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  //@ts-ignore
  regiseterSubscription: Subscription;
  signupForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    },
    {
      validators: [Validation.match('password', 'confirm_password')],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private dialog: MatDialog,
    private registerService: RegisterService
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    const raw_data_ = this.signupForm.getRawValue();
    let data: RegisterInterface = {
      role: 'user',
      username: raw_data_.username ? raw_data_.username : '',
      mobile: raw_data_.mobile ? raw_data_.mobile : '',
      address: raw_data_.address ? raw_data_.address : '',
      email: raw_data_.email ? raw_data_.email : '',
      password: raw_data_.password ? raw_data_.password : '',
    };
    this.regiseterSubscription = this.registerService
      .RegisterStudent(data)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log('registration success');
            this.onNoClick();
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
          if (err.status == 409) {
            this.signupForm.controls.email.setErrors({ alreadyExists: true });
          }
        },
        complete: () => {},
      });
  }

  openLogin() {
    this.dialog.open(LoginComponent);
    this.onNoClick();
  }

  ngOnDestroy() {
    if (this.regiseterSubscription) {
      this.regiseterSubscription.unsubscribe();
    }
  }
}
