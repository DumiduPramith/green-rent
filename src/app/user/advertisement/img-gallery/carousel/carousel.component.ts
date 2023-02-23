import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @ViewChild('owlCar', { static: false }) owlCar: any;
  @Input() images: string[] = [];
  @Output() imgChangeEvent = new EventEmitter<number>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    responsive: {
      0: {
        items: 3,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}

  activeImg = 1;

  getData(data: SlidesOutputData) {
    console.log(data);
    this.next(data);
  }

  next(data: SlidesOutputData) {
    let len = this.images.length;
    this.activeImg = data.startPosition! + 1;
    if (this.activeImg === len) {
      this.activeImg = 0;
    }

    this.imgChangeEvent.emit(this.activeImg);
  }

  setId(index: number): string {
    return 'owl-slide-' + index;
  }

  changeImg(index: number) {
    let length = this.images.length;
    if (index === 0) {
      this.owlCar.to('owl-slide-' + (length - 1));
    } else {
      this.owlCar.to('owl-slide-' + (index - 1));
    }
  }
}
