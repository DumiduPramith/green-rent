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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { PostAdModule } from './post-ad/post-ad.module';
import { PostAdComponent } from './post-ad/post-ad.component';

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
    PostAdModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
  ],
  exports: [
    SearchBarComponent,
    FilterLocationComponent,
    BookNowComponent,
    PostAdComponent,
  ],
})
export class FeaturesModule {}
