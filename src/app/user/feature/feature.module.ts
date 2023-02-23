import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchBarComponent } from './search/search-bar.component';
import { FilterLocationComponent } from './filter-location/filter-location.component';
import { BookNowComponent } from './book-now/book-now.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SearchBarComponent,
    FilterLocationComponent,
    BookNowComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  exports: [
    SearchBarComponent,
    FilterLocationComponent,
    BookNowComponent,
    LoginComponent,
    SignupComponent,
  ],
})
export class FeaturesModule {}
