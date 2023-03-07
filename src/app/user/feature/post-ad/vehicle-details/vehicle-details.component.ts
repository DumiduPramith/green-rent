import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent {
  // @ts-ignore
  detailsForm: FormGroup;
  constructor(private ctrlContainer: FormGroupDirective) {}

  ngOnInit() {
    this.detailsForm = this.ctrlContainer.form;
    this.detailsForm.addControl(
      'title',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'description',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'phone',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'passengers',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'seats',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'weight',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'driver',
      new FormControl(false, Validators.required)
    );
    this.detailsForm.addControl(
      'ac',
      new FormControl(false, Validators.required)
    );
  }
}
