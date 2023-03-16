import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvertisementCardInterface } from '../../profile/interfaces/advertisement-card.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchSearchResultService {
  constructor(private http: HttpClient) {}

  fetchSearchResults(query: string, district: string = '') {
    let params = new HttpParams();
    params = params.set('search', query);
    if (district) {
      params = params.set('district', district);
    }
    const url = 'http://localhost:5000/api/get/search';
    return this.http.get<AdvertisementCardInterface[]>(url, { params });
  }
}
