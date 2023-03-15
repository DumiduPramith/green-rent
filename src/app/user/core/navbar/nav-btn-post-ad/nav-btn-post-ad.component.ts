import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-btn-post-ad',
  templateUrl: './nav-btn-post-ad.component.html',
  styleUrls: ['./nav-btn-post-ad.component.scss'],
})
export class NavBtnPostAdComponent {
  constructor(private route: Router) {}

  navigatePostAd() {
    this.route.navigate(['post-ad']);
  }
}
