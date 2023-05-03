import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchProfileService } from '../../profile/services/fetch-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() userId = 1;
  //@ts-ignore
  private profileHttpSubscription: Subscription;

  userDetails = {
    username: 'Johnatan Smith',
    mobile: '(94)712586478',
    address: 'Bay Area, chilaw',
    email: 'example@example.com',
  };
  constructor(
    private fetchProfile: FetchProfileService,
    private route: Router
  ) {}
  ngOnInit() {
    this.profileHttpSubscription = this.fetchProfile
      .getUserProfile(this.userId)
      .subscribe({
        next: (data) => {
          this.userDetails = data;
        },
        error: (err) => {
          this.route.navigate(['notfound']);
        },
        complete: () => {},
      });
  }

  ngOnDestroy() {
    if (this.profileHttpSubscription) {
      this.profileHttpSubscription.unsubscribe();
    }
  }
}
