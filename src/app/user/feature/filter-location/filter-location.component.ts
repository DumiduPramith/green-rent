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
  district: District[] = [
    { value: 'Kurunegala', viewValue: 'Kurunegala' },
    { value: 'Colombo', viewValue: 'Colombo' },
    { value: 'Jaffna', viewValue: 'Jaffna' },
    { value: 'Matara', viewValue: 'Matara' },
  ];
}
