import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchBarComponent } from './search/search-bar.component';
import { FilterLocationComponent } from './filter-location/filter-location.component';
import { BookNowComponent } from './book-now/book-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SearchBarComponent,
    FilterLocationComponent,
    BookNowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
  ],
  exports: [SearchBarComponent, FilterLocationComponent, BookNowComponent],
})
export class FeaturesModule {}
