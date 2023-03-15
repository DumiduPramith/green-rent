import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavBrandComponent } from './nav-brand/nav-brand.component';
import { NavBtnLoginComponent } from './nav-btn-login/nav-btn-login.component';
import { NavBtnProfileComponent } from './nav-btn-profile/nav-btn-profile.component';
import { NavBtnPostAdComponent } from './nav-btn-post-ad/nav-btn-post-ad.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    NavBrandComponent,
    NavBtnLoginComponent,
    NavBtnProfileComponent,
    NavBtnPostAdComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
