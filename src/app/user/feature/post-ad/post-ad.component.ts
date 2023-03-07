import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss'],
})
export class PostAdComponent {
  vehicleFormGroup = this._formBuilder.group({});
  insuranceFormGroup = this._formBuilder.group({});
  vehicleDetailsFormGroup = this._formBuilder.group({});
  imagesFormGroup = this._formBuilder.group({});

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {}
}
