import { Component, Input } from '@angular/core';

interface Img {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() img: Img = {
    src: '',
    alt: '',
  };
  @Input() categoryName = '';
  @Input() noOfAds = 0;
}
