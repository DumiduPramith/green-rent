import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectDistrictEventService } from '../../feature/services/select-district-event.service';
import { Router } from '@angular/router';

interface Img {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() img: Img = {
    src: '',
    alt: '',
  };
  @Input() categoryName = '';
  @Input() noOfAds = 0;

  //@ts-ignore
  selDistrictEventSubscription: Subscription;
  selected_district = 'All of Sri Lanka';
  constructor(
    private route: Router,
    private selectDistrictEvent: SelectDistrictEventService
  ) {}

  ngOnInit() {
    this.selDistrictEventSubscription =
      this.selectDistrictEvent.selectDistrictEvent.subscribe((data) => {
        this.selected_district = data;
      });
  }

  onClick() {
    if (this.selected_district == 'All of Sri Lanka') {
      this.route.navigate(['/results'], {
        queryParams: { search_query: this.categoryName },
      });
    } else {
      this.route.navigate(['/results'], {
        queryParams: {
          search_query: this.categoryName,
          district: this.selected_district,
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.selDistrictEventSubscription) {
      this.selDistrictEventSubscription.unsubscribe();
    }
  }
}
