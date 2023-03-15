import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAdComponent } from './post-ad.component';
import { MatStepperModule } from '@angular/material/stepper';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InsuranceComponent } from './insurance/insurance.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ImagesComponent } from './images/images.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PostAdComponent, title: 'post ad' },
];

@NgModule({
  declarations: [
    PostAdComponent,
    VehicleComponent,
    InsuranceComponent,
    VehicleDetailsComponent,
    ImagesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes),
  ],
  exports: [PostAdComponent],
})
export class PostAdModule {}
