import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { Subscription } from 'rxjs';
import { VehicleFormInterface } from './interfaces/vehicleDetailsForm.interface';
import { PostAdService } from './services/post-ad.service';
import { SelectionChangeEventService } from './services/selection-change-event.service';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss'],
})
export class PostAdComponent {
  //@ts-ignore
  postAdHttpSubscription: Subscription;

  vehicleFormGroup = this._formBuilder.group({});
  insuranceFormGroup = this._formBuilder.group({});
  vehicleDetailsFormGroup = this._formBuilder.group({});
  imagesFormGroup = this._formBuilder.group({});

  name = localStorage.getItem('username');
  constructor(
    private _formBuilder: FormBuilder,
    private postAdHttp: PostAdService,
    private selectionChangeEvent: SelectionChangeEventService,
    private route: Router
  ) {}

  ngOnInit() {}

  isEditable = true;
  isLinear = false;

  async PostAd() {
    if (
      this.vehicleFormGroup.valid &&
      this.insuranceFormGroup.valid &&
      this.vehicleDetailsFormGroup.valid &&
      this.imagesFormGroup.valid
    ) {
      const formData = new FormData();
      const vehicleForm = new Blob(
        [JSON.stringify(this.vehicleFormGroup.value, this.replacer)],
        { type: 'application/json' }
      );
      const insuranceForm = new Blob(
        [JSON.stringify(this.insuranceFormGroup.value)],
        { type: 'application/json' }
      );
      const raw_data =
        this.vehicleDetailsFormGroup.getRawValue() as VehicleFormInterface;
      let vehicleDetailsForm: any = {
        title: raw_data.title,
        description: raw_data.description,
        phone: raw_data.phone,
        rate: raw_data.rate,
        duration: raw_data.duration,
        district: raw_data.district,
        userId: localStorage.getItem('userId'),
      };

      if (this.vehicleFormGroup.get('type')?.value === 'car') {
        vehicleDetailsForm.driver = raw_data.driver;
        vehicleDetailsForm.ac = raw_data.ac;
        vehicleDetailsForm.passengers = raw_data.passengers;
      } else if (this.vehicleFormGroup.get('type')?.value === 'bike') {
        vehicleDetailsForm.enginecapacity = raw_data.enginecapacity;
      } else if (this.vehicleFormGroup.get('type')?.value === 'lorry') {
        vehicleDetailsForm.driver = raw_data.driver;
        vehicleDetailsForm.weight = raw_data.weight;
      } else if (this.vehicleFormGroup.get('type')?.value === 'bus') {
        vehicleDetailsForm.driver = raw_data.driver;
        vehicleDetailsForm.ac = raw_data.ac;
        vehicleDetailsForm.seats = raw_data.seats;
      } else if (this.vehicleFormGroup.get('type')?.value === 'van') {
        vehicleDetailsForm.driver = raw_data.driver;
        vehicleDetailsForm.ac = raw_data.ac;
        vehicleDetailsForm.passengers = raw_data.passengers;
      }
      const vehicleDetailsBlob = new Blob(
        [JSON.stringify(vehicleDetailsForm)],
        { type: 'application/json' }
      );
      const images = this.imagesFormGroup.get('files')
        ?.value as unknown as FileList;

      const zip = new JSZip();

      for (let i = 0; i < images.length; i++) {
        zip.file(`image${i}.jpg`, images[i]);
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const file = new File([blob], 'images.zip', {
        type: 'application/zip',
      });
      formData.append('files', file, 'file.zip');
      formData.append('vehicle', vehicleForm, 'vehicle.json');
      formData.append('insurance', insuranceForm, 'insurance.json');
      formData.append('details', vehicleDetailsBlob, 'details.json');
      this.postAdHttpSubscription = this.postAdHttp.postAd(formData).subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log('Success');
            this.route.navigate(['/profile', localStorage.getItem('userId')]);
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
        },
        complete: () => {},
      });
    } else {
      if (this.vehicleFormGroup.invalid) {
        console.log('VehicleFormGroup.invalid');
      } else if (this.insuranceFormGroup.invalid) {
        console.log('InsuranceFormGroup.invalid');
      } else if (this.vehicleDetailsFormGroup.invalid) {
        for (const name in this.vehicleDetailsFormGroup.controls) {
          if (this.vehicleDetailsFormGroup.get(name)?.invalid) {
            console.log(name);
          }
        }
        console.log('VehicleDetailsFormGroup.invalid');
      } else if (this.imagesFormGroup.invalid) {
        console.log('ImagesFormGroup.invalid');
      } else {
        console.log('Form group error other');
      }
    }
  }

  replacer(key: any, value: any) {
    // to remove circular reference
    if (value instanceof FormGroup || value instanceof FormControl) {
      return undefined; // Remove circular references
    }
    return value;
  }

  onStepChange(event: any) {
    this.selectionChangeEvent.selectionChangeEventEmit();
  }

  ngOnDestroy() {
    if (this.postAdHttpSubscription) {
      this.postAdHttpSubscription.unsubscribe();
    }
  }
}
