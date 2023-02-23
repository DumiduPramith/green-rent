import { ProfileModule } from './../profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './advertisement.component';
import { AdGalleryComponent } from './ad-gallery/ad-gallery.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { Routes, RouterModule } from '@angular/router';
import { AdDateTimeComponent } from './ad-date-time/ad-date-time.component';
import { AdPriceComponent } from './ad-price/ad-price.component';
import { FeaturesModule } from '../feature/feature.module';
import { ImgGalleryModule } from './img-gallery/img-gallery.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: AdvertisementComponent }];

@NgModule({
  declarations: [
    AdvertisementComponent,
    AdGalleryComponent,
    AdDetailsComponent,
    AdDateTimeComponent,
    AdPriceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturesModule,
    ImgGalleryModule,
    SharedModule,
  ],
})
export class AdvertisementModule {}
