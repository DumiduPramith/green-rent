import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss'],
})
export class ImgGalleryComponent {
  @Input() images: string[] = [];
  @Input() magnification = 1.5;
  activeImg = 1;
  activeImgChange(event: number) {
    this.activeImg = event;
    console.log(event);
  }
}
