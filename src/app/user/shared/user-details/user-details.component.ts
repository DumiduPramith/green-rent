import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  user_details = {
    name: 'Johnatan Smith',
    phone: '(94)712586478',
    address: 'Bay Area, chilaw',
    email: 'example@example.com',
  };
}
