import { Component } from '@angular/core';

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss'],
})
export class FilterLocationComponent {
  search_location = 'All of Sri Lanka';
  district: District[] = [
    { value: 'kurunegala', viewValue: 'Kurunegala' },
    { value: 'colombo', viewValue: 'Colombo' },
    { value: 'jaffna', viewValue: 'Jaffna' },
    { value: 'matara', viewValue: 'Matara' },
  ];

  selectOption(value: string) {
    this.search_location = value;
    console.log(value);
  }
}
