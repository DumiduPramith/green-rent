import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from './ad-card/ad-card.component';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AdCardComponent, UserAdsComponent, UserDetailsComponent],
  imports: [CommonModule, MatCardModule],
  exports: [AdCardComponent, UserAdsComponent, UserDetailsComponent],
})
export class SharedModule {}
