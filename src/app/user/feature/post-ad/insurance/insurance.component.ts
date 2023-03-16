import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { InsuranceCompanyInterface } from '../interfaces/insurance_company.interface';
import { InsuranceCompaniesService } from '../services/insurance-companies.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
})
export class InsuranceComponent {
  //@ts-ignore
  insuranceForm: FormGroup;
  //@ts-ignore
  insuranceSubscription: Subscription;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private insuranceHttp: InsuranceCompaniesService
  ) {}

  insuranceComapnies: InsuranceCompanyInterface[] = [];

  ngOnInit() {
    this.insuranceForm = this.ctrlContainer.form;
    this.insuranceForm.addControl(
      'company',
      new FormControl('', Validators.required)
    );
    this.insuranceForm.addControl(
      'insuranceType',
      new FormControl('', Validators.required)
    );
    this.insuranceForm.addControl(
      'collisonCoverage',
      new FormControl(false, Validators.required)
    );
    this.insuranceForm.addControl(
      'bodyCoverage',
      new FormControl(false, Validators.required)
    );
    this.insuranceForm.addControl(
      'medicalCoverage',
      new FormControl(false, Validators.required)
    );

    this.insuranceSubscription = this.insuranceHttp.getBrandNames().subscribe({
      next: (response) => {
        this.insuranceComapnies = response;
        console.log('Response received: ', response);
      },
      error: (err) => {
        console.log('Error occured: ', err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  ngOnDestroy() {
    if (this.insuranceSubscription) {
      this.insuranceSubscription.unsubscribe();
    }
  }
}
