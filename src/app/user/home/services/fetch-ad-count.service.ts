import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdCountInterface } from '../interfaces/adCount.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchAdCountService {
  constructor(private http: HttpClient) {}

  fetchAdCount() {
    const url = 'http://localhost:5000/api/get/ad-count';

    return this.http.get<AdCountInterface>(url);
  }
}
