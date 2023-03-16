import { GetDistrictsService } from './../../services/get-districts.service';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { SelectionChangeEventService } from '../services/selection-change-event.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent {
  // @ts-ignore
  detailsForm: FormGroup;
  // @ts-ignore
  @Input() VehicleFormGroup: FormGroup;
  districts: any;
  constructor(
    private ctrlContainer: FormGroupDirective,
    private selectionChangeEvent: SelectionChangeEventService,
    private fetchDistricts: GetDistrictsService
  ) {
    this.districts = this.fetchDistricts.getDistricts();
  }

  ngOnInit() {
    this.detailsForm = this.ctrlContainer.form;
    this.detailsForm.addControl(
      'district',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'title',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'description',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'rate',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'duration',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'phone',
      new FormControl('', Validators.required)
    );
    this.detailsForm.addControl(
      'enginecapacity',
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
    this.selectionChangeEvent.selectionEvent.subscribe((data) => {
      if (['bike'].includes(this.VehicleFormGroup.get('type')?.value)) {
        this.detailsForm.get('passengers')?.clearValidators();
        this.detailsForm.get('passengers')?.updateValueAndValidity();
        this.detailsForm.get('seats')?.clearValidators();
        this.detailsForm.get('seats')?.updateValueAndValidity();
        this.detailsForm.get('weight')?.clearValidators();
        this.detailsForm.get('weight')?.updateValueAndValidity();
        this.detailsForm.get('driver')?.updateValueAndValidity();
        this.detailsForm.get('ac')?.clearValidators();
        this.detailsForm.get('ac')?.updateValueAndValidity();
      } else if (['car'].includes(this.VehicleFormGroup.get('type')?.value)) {
        this.detailsForm.get('enginecapacity')?.clearValidators();
        this.detailsForm.get('enginecapacity')?.updateValueAndValidity();
        this.detailsForm.get('seats')?.clearValidators();
        this.detailsForm.get('seats')?.updateValueAndValidity();
        this.detailsForm.get('weight')?.clearValidators();
        this.detailsForm.get('weight')?.updateValueAndValidity();
      } else if (['lorry'].includes(this.VehicleFormGroup.get('type')?.value)) {
        this.detailsForm.get('enginecapacity')?.clearValidators();
        this.detailsForm.get('enginecapacity')?.updateValueAndValidity();
        this.detailsForm.get('passengers')?.clearValidators();
        this.detailsForm.get('passengers')?.updateValueAndValidity();
        this.detailsForm.get('seats')?.clearValidators();
        this.detailsForm.get('seats')?.updateValueAndValidity();
        this.detailsForm.get('ac')?.clearValidators();
        this.detailsForm.get('ac')?.updateValueAndValidity();
      } else if (['bus'].includes(this.VehicleFormGroup.get('type')?.value)) {
        this.detailsForm.get('enginecapacity')?.clearValidators();
        this.detailsForm.get('enginecapacity')?.updateValueAndValidity();
        this.detailsForm.get('passengers')?.clearValidators();
        this.detailsForm.get('passengers')?.updateValueAndValidity();
        this.detailsForm.get('weight')?.clearValidators();
        this.detailsForm.get('weight')?.updateValueAndValidity();
      } else if (['van'].includes(this.VehicleFormGroup.get('type')?.value)) {
        this.detailsForm.get('enginecapacity')?.clearValidators();
        this.detailsForm.get('enginecapacity')?.updateValueAndValidity();
        this.detailsForm.get('seats')?.clearValidators();
        this.detailsForm.get('seats')?.updateValueAndValidity();
        this.detailsForm.get('weight')?.clearValidators();
        this.detailsForm.get('weight')?.updateValueAndValidity();
      }
    });
  }
}
