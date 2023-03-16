import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginChangerService } from '../services/login-changer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn = !!localStorage.getItem('isLoggedIn');

  //@ts-ignore
  private loginCheckServiceSubscription: Subscription;

  constructor(private loggedInCheckService: LoginChangerService) {}
  ngOnInit() {
    this.loginCheckServiceSubscription =
      this.loggedInCheckService.loginChangeEvent.subscribe(() => {
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      });
  }

  ngOnDestroy() {
    if (this.loginCheckServiceSubscription) {
      this.loginCheckServiceSubscription.unsubscribe();
    }
  }
}
