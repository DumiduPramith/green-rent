import { Component } from '@angular/core';

@Component({
  selector: 'app-ad-gallery',
  templateUrl: './ad-gallery.component.html',
  styleUrls: ['./ad-gallery.component.scss'],
})
export class AdGalleryComponent {
  images = [
    'assets/car/car1.jpeg',
    'assets/car/car2.jpeg',
    'assets/car/car3.jpeg',
    'assets/car/car4.jpg',
    'assets/car/car5.jpg',
  ];
}
