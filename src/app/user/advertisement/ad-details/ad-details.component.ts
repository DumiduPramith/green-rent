import { Component, Input } from '@angular/core';
import { AdDetailsInterface } from '../interfaces/adHttp.interface';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
})
export class AdDetailsComponent {
  @Input() adDetails: AdDetailsInterface = {
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
}
