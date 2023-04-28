import { Component, Input, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  // @ts-ignore
  multilineText;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(change: SimpleChange) {
    this.multilineText = this.sanitizer.bypassSecurityTrustHtml(
      this.adDetails.description.replace(/\n/g, '<br>')
    );
  }
}
