import { SelectDistrictEventService } from './../services/select-district-event.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchBarComponent {
  selected_district = 'All of Sri Lanka';
  search = '';
  //@ts-ignore
  selDistrictEventSubscription: Subscription;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private selectDistrictEvent: SelectDistrictEventService
  ) {}

  ngOnInit() {
    this.selDistrictEventSubscription =
      this.selectDistrictEvent.selectDistrictEvent.subscribe((data) => {
        this.selected_district = data;
      });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('search_query');
      if (q) {
        this.search = q;
      }
    });
  }

  onSearch() {
    if (this.selected_district == 'All of Sri Lanka') {
      this.route.navigate(['/results'], {
        queryParams: { search_query: this.search },
      });
    } else {
      this.route.navigate(['/results'], {
        queryParams: {
          search_query: this.search,
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
