import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  //@ts-ignore
  Imageform: FormGroup;

  constructor(private ctrlContainer: FormGroupDirective) {}

  ngOnInit() {
    this.Imageform = this.ctrlContainer.form;
    this.Imageform.addControl(
      'files',
      new FormControl('', Validators.required)
    );
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.Imageform.patchValue({ files });
    console.log(event);
  }
}
