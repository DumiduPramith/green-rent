import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { FilterLocationComponent } from './filter-location/filter-location.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SearchComponent,
    FilterLocationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
