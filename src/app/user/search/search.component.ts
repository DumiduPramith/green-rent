import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdvertisementCardInterface } from '../profile/interfaces/advertisement-card.interface';
import { FetchSearchResultService } from './services/fetch-search-result.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query$: string = '';
  //@ts-ignore
  searchSubscription: Subscription;

  adList: AdvertisementCardInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private fetchSearchResults: FetchSearchResultService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('search_query');
      const district = params.get('district');
      if (q && district) {
        this.query$ = q;
        this.searchSubscription = this.fetchSearchResults
          .fetchSearchResults(this.query$)
          .subscribe({
            next: (data) => {
              this.adList = data;
            },
            error: (err) => {},
            complete: () => {},
          });
      } else if (q) {
        this.query$ = q;
        this.searchSubscription = this.fetchSearchResults
          .fetchSearchResults(this.query$)
          .subscribe({
            next: (data) => {
              this.adList = data;
            },
            error: (err) => {},
            complete: () => {},
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
