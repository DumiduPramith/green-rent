import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    SharedModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
