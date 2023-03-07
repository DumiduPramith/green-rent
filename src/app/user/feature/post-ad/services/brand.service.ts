import { BrandResponse } from './../interfaces/brand.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getBrandNames(type: string) {
    const url = 'http://localhost:5000/api/get/brand-names';
    const params = new HttpParams().set('type', type);
    return <Observable<BrandResponse[]>>this.http.get(url, { params });
  }
}
