import { District } from './../interfaces/districts.interface';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { GetDistrictsService } from '../services/get-districts.service';

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

  constructor(private fetchDistricts: GetDistrictsService) {}

  ngOnInit() {
    this.getDistrictSubscription = this.fetchDistricts
      .getDistricts()
      .subscribe((data) => {
        this.district = data;
      });
  }

  selectOption(value: number) {
    if (value === 0) {
      this.search_location = 'All of Sri Lanka';
    } else {
      for (let option of this.district) {
        if (option.value == value) {
          this.search_location = option.viewValue;
          break;
        }
      }
    }
    console.log(value);
  }
}
