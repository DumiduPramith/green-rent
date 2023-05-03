import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AdCardComponent,
  DeleteConfirmationDialogComponent,
} from './ad-card/ad-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { MatCardModule } from '@angular/material/card';
import { AdcardSectionComponent } from './adcard-section/adcard-section.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdCardComponent,
    UserDetailsComponent,
    AdcardSectionComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [AdCardComponent, UserDetailsComponent, AdcardSectionComponent],
})
export class SharedModule {}
