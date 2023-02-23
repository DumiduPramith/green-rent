import { Component } from '@angular/core';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent {
  Image_details = [
    {
      img: { src: 'assets/icons/car.png', alt: 'Car Image' },
      category_name: 'Car',
    },
    {
      img: { src: 'assets/icons/bus.png', alt: 'Bus Image' },
      category_name: 'Bus',
    },
    {
      img: { src: 'assets/icons/lorry.png', alt: 'Lorry Image' },
      category_name: 'Lorry',
    },
    {
      img: { src: 'assets/icons/van.png', alt: 'Van Image' },
      category_name: 'Van',
    },
    {
      img: { src: 'assets/icons/bike.png', alt: 'Bike Image' },
      category_name: 'Bike',
    },
  ];
}
