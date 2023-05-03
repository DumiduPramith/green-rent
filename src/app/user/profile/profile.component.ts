import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AdvertisementCardInterface } from './interfaces/advertisement-card.interface';
import { ProfileHttpInterface } from './interfaces/profile-http.interface';
import { FetchUserAdService } from './services/fetch-user-ad.service';
import { AdcardSectionRefreshService } from '../shared/services/adcard-section-refresh.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  //@ts-ignore
  private userAdsHttpSubscription: Subscription;
  //@ts-ignore
  private adcardRefreshSubscription: Subscription;

  id: number = 0;
  profileDetails: ProfileHttpInterface = {
    username: '',
    mobile: '',
    address: '',
    email: '',
  };

  adlist: AdvertisementCardInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fetchUserAdsService: FetchUserAdService,
    private adcardRefreshEvent: AdcardSectionRefreshService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
    });

    this.adcardRefreshEvent.refreshEvent.subscribe(() => {
      this.fetchUserAds();
    });

    this.fetchUserAds();
  }

  fetchUserAds() {
    this.userAdsHttpSubscription = this.fetchUserAdsService
      .fetchUserAds(this.id)
      .subscribe({
        next: (response) => {
          this.adlist = response;
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  ngOnDestroy() {
    if (this.userAdsHttpSubscription) {
      this.userAdsHttpSubscription.unsubscribe();
    }

    if (this.adcardRefreshSubscription) {
      this.adcardRefreshSubscription.unsubscribe();
    }
  }
}
