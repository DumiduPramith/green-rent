import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvertisementCardInterface } from '../interfaces/advertisement-card.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchUserAdService {
  constructor(private http: HttpClient) {}

  fetchUserAds(userId: number) {
    const url = `http://localhost:5000/api/get/ads/${userId}`;
    return this.http.get<AdvertisementCardInterface[]>(url);
  }
}
