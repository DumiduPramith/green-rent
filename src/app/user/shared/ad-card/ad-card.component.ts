import { AdvertisementCardInterface } from './../../profile/interfaces/advertisement-card.interface';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent {
  @Input() ad_card_details: AdvertisementCardInterface = {
    username: '',
    user_id: 0,
    profile_picture: '',
    title: '',
    ad_image: '',
    rate: 0,
    duration: '',
    ad_id: 0,
  };

  constructor(private route: Router) {}

  goToAd() {
    this.route.navigate(['ad', this.ad_card_details.ad_id]);
  }
}
