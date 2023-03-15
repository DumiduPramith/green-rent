import { Subscription } from 'rxjs/internal/Subscription';
import { Component } from '@angular/core';
import { FetchAdCountService } from '../services/fetch-ad-count.service';
import { AdCountInterface } from '../interfaces/adCount.interface';

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
      count: 0,
    },
    {
      img: { src: 'assets/icons/bus.png', alt: 'Bus Image' },
      category_name: 'Bus',
      count: 0,
    },
    {
      img: { src: 'assets/icons/lorry.png', alt: 'Lorry Image' },
      category_name: 'Lorry',
      count: 0,
    },
    {
      img: { src: 'assets/icons/van.png', alt: 'Van Image' },
      category_name: 'Van',
      count: 0,
    },
    {
      img: { src: 'assets/icons/bike.png', alt: 'Bike Image' },
      category_name: 'Bike',
      count: 0,
    },
  ];
  //@ts-ignore
  fetchCountSubscription: Subscription;
  constructor(private fetchCount: FetchAdCountService) {}

  ngOnInit() {
    this.fetchCountSubscription = this.fetchCount.fetchAdCount().subscribe({
      next: (data) => {
        for (let item of this.Image_details) {
          item.count =
            data[item.category_name.toLowerCase() as keyof AdCountInterface];
        }
      },
      error: (err) => {},
      complete: () => {
        this.fetchCountSubscription.unsubscribe();
      },
    });
  }
}
