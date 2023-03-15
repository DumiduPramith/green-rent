import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() userDetails = {
    username: 'Johnatan Smith',
    mobile: '(94)712586478',
    address: 'Bay Area, chilaw',
    email: 'example@example.com',
  };
}
