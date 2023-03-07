import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsuranceCompanyInterface } from '../interfaces/insurance_company.interface';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompaniesService {
  constructor(private http: HttpClient) {}

  getBrandNames() {
    const url = 'http://localhost:5000/api/get/insurance-companies';
    return <Observable<InsuranceCompanyInterface[]>>this.http.get(url);
  }
}
