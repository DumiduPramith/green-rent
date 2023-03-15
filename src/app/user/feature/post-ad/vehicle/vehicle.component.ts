import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { BrandResponse } from '../interfaces/brand.interface';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  //@ts-ignore
  form: FormGroup;
  //@ts-ignore
  brandSubscription: Subscription;
  // @ts-ignore
  filterOptions: Observable<BrandResponse[]>;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private brandHttp: BrandService
  ) {}

  ngOnInit() {
    this.form = this.ctrlContainer.form;
    this.form.addControl('type', new FormControl('', Validators.required));
    this.form.addControl(
      'brand',
      new FormControl({ value: '', disabled: true }, [Validators.required])
    );
    this.form.addControl(
      'transmission',
      new FormControl('', Validators.required)
    );
    // @ts-ignore
    this.filterOptions = this.form.get('brand')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.brandName;
        return name ? this._filter(name as string) : this.brands.slice();
      })
    );
  }

  type = ['car', 'truck', 'bus', 'van', 'bike'];
  brands: BrandResponse[] = [];

  brandChange(value: string) {
    const brand_control = this.form.get('brand');
    if (brand_control?.enabled) {
      brand_control.disable();
    }
    this.brandSubscription = this.brandHttp.getBrandNames(value).subscribe({
      next: (response) => {
        this.brands = response;
        if (brand_control?.disabled) {
          brand_control.enable();
        }
        console.log('Response received: ', response);
      },
      error: (err) => {
        this.brandSubscription.unsubscribe();
        console.log('Error occured: ', err);
      },
      complete: () => {
        this.brandSubscription.unsubscribe();
        console.log('Complete');
      },
    });
  }

  displayFn = (brandNumber: number) => {
    for (let item of this.brands) {
      if (item.brandId === +brandNumber) {
        return item.brandName;
      }
    }
    return '';
  };
  // displayFn(brand_number: number) {
  //   console.log(this.brands)
  //   return '';
  // }

  private _filter(name: string): BrandResponse[] {
    const filterValue = name.toLowerCase();
    return this.brands.filter((option) =>
      option.brandName.toLowerCase().includes(filterValue)
    );
  }
}
