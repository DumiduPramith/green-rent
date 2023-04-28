import { SelectDistrictEventService } from './../services/select-district-event.service';
import { District } from './../interfaces/districts.interface';
import { Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { GetDistrictsService } from '../services/get-districts.service';
import { ActivatedRoute } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss'],
})
export class FilterLocationComponent {
  //@ts-ignore
  getDistrictSubscription: Subscription;
  search_location = 'All of Sri Lanka';
  district: District[] = [];
  //@ts-ignore
  @ViewChild('trigger', { static: true }) trigger: MatMenuTrigger;
  constructor(
    private fetchDistricts: GetDistrictsService,
    private selectDistrictEvent: SelectDistrictEventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((query) => {
      const district = query.get('district');
      if (district) {
        this.search_location = district;
      }
    });
    this.getDistrictSubscription = this.fetchDistricts
      .getDistricts()
      .subscribe((data) => {
        this.district = data;

        if (this.search_location != 'All of Sri Lanka') {
          for (let i of this.district) {
            if (i.viewValue == this.search_location) {
              this.trigger.menuData = { selected: i.value };
              break;
            }
          }
        }
      });
  }

  selectOption(value: number) {
    if (value === 0) {
      this.search_location = 'All of Sri Lanka';
      this.selectDistrictEvent.sendSelectedDistrict('All of Sri Lanka');
    } else {
      for (let option of this.district) {
        if (option.value == value) {
          this.search_location = option.viewValue;
          this.selectDistrictEvent.sendSelectedDistrict(option.viewValue);
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.getDistrictSubscription) {
      this.getDistrictSubscription.unsubscribe();
    }
  }
}
