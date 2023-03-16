import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdDetailsHttpInterface } from '../interfaces/adHttp.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchAdDetailsService {
  constructor(private http: HttpClient) {}

  fetchAdDetails(adId: number) {
    const url = `http://localhost:5000/api/get/ad-details/${adId}`;

    return this.http.get<AdDetailsHttpInterface>(url);
  }
}
