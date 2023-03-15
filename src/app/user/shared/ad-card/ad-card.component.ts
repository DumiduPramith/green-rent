import { AdvertisementCardInterface } from './../../profile/interfaces/advertisement-card.interface';
import { Component, Input } from '@angular/core';

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
}
