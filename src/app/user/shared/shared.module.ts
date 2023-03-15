import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from './ad-card/ad-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { MatCardModule } from '@angular/material/card';
import { AdcardSectionComponent } from './adcard-section/adcard-section.component';

@NgModule({
  declarations: [AdCardComponent, UserDetailsComponent, AdcardSectionComponent],
  imports: [CommonModule, MatCardModule],
  exports: [AdCardComponent, UserDetailsComponent, AdcardSectionComponent],
})
export class SharedModule {}
