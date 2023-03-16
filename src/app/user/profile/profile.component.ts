import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AdvertisementCardInterface } from './interfaces/advertisement-card.interface';
import { ProfileHttpInterface } from './interfaces/profile-http.interface';
import { FetchProfileService } from './services/fetch-profile.service';
import { FetchUserAdService } from './services/fetch-user-ad.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  //@ts-ignore
  private profileHttpSubscription: Subscription;
  //@ts-ignore
  private userAdsHttpSubscription: Subscription;

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
    private fetchProfile: FetchProfileService,
    private fetchUserAds: FetchUserAdService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
    });

    this.profileHttpSubscription = this.fetchProfile
      .getUserProfile(this.id)
      .subscribe({
        next: (data) => {
          this.profileDetails = data;
        },
        error: (err) => {
          this.route.navigate(['notfound']);
        },
        complete: () => {},
      });

    this.userAdsHttpSubscription = this.fetchUserAds
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
    if (this.profileHttpSubscription) {
      this.profileHttpSubscription.unsubscribe();
    }

    if (this.userAdsHttpSubscription) {
      this.userAdsHttpSubscription.unsubscribe();
    }
  }
}
