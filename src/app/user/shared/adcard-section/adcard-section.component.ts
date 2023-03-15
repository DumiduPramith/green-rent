import { Component, Input } from '@angular/core';
import { AdvertisementCardInterface } from '../../profile/interfaces/advertisement-card.interface';

@Component({
  selector: 'app-adcard-section',
  templateUrl: './adcard-section.component.html',
  styleUrls: ['./adcard-section.component.scss'],
})
export class AdcardSectionComponent {
  @Input() adList: AdvertisementCardInterface[] = [];
}
