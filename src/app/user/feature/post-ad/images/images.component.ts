import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

interface SelectedImageInterface {
  url: SafeUrl;
  file: File;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  //@ts-ignore
  Imageform: FormGroup;
  images: SelectedImageInterface[] = [];

  constructor(private ctrlContainer: FormGroupDirective) {}

  ngOnInit() {
    this.Imageform = this.ctrlContainer.form;
    this.Imageform.addControl(
      'files',
      new FormControl('', Validators.required)
    );
  }

  onFileSelected(event: any) {
    this.images = [];
    if (event.target.files) {
      const files = event.target.files;
      this.Imageform.patchValue({ files });
      for (let i = 0; i < event.target.files.length; i++) {
        const file = new FileReader();
        file.onload = (e: any) => {
          let img = { url: e.target.result, file: event.target.files[i] };
          this.images.push(img);
        };
        file.readAsDataURL(event.target.files[i]);
      }
    }
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');
    // @ts-ignore
    phContainer.removeChild(phElement);
    // @ts-ignore
    phContainer.parentElement.insertBefore(phElement, phContainer);

    moveItemInArray(this.images, dragIndex, dropIndex);
    let tmp = [];
    for (let i = 0; i < this.images.length; i++) {
      tmp.push(this.images[i].file);
    }
    this.Imageform.patchValue({ files: tmp });
  }
}
