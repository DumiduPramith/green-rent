import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-price',
  templateUrl: './ad-price.component.html',
  styleUrls: ['./ad-price.component.scss'],
})
export class AdPriceComponent {
  @Input() rate = 0;
  @Input() duration = '';
}
