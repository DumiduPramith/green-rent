import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdDetailsInterface } from './interfaces/adHttp.interface';
import { FetchAdDetailsService } from './services/fetch-ad-details.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent {
  adId = 0;
  //@ts-ignore
  fetchAdSubscription: Subscription;
  adDetails: AdDetailsInterface = {
    adId: 0,
    createdAt: '',
    description: '',
    rate: 0,
    rateDuration: '',
    title: '',
    userId: 0,
    vehicleId: 0,
    phone: 0,
    district: '',
  };
  adImages: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private fetchAdDetails: FetchAdDetailsService
  ) {
    this.activatedRoute.params.subscribe((param) => {
      this.adId = param['id'];
    });
  }

  ngOnInit() {
    this.fetchAdSubscription = this.fetchAdDetails
      .fetchAdDetails(this.adId)
      .subscribe({
        next: (data) => {
          this.adImages = data.images;
          const { images, ...newData } = data;
          this.adDetails = newData;
        },
        error: (err) => {},
        complete: () => {},
      });
  }
  ngOnDestroy() {
    if (this.fetchAdSubscription) {
      this.fetchAdSubscription.unsubscribe();
    }
  }
}
