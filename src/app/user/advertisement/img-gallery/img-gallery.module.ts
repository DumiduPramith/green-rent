import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageZoomComponent } from './ngx-image-zoom/ngx-image-zoom.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImgGalleryComponent } from './img-gallery.component';

@NgModule({
  declarations: [NgxImageZoomComponent, CarouselComponent, ImgGalleryComponent],
  imports: [CommonModule, CarouselModule],
  exports: [ImgGalleryComponent],
})
export class ImgGalleryModule {}
