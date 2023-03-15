import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../interfaces/districts.interface';

@Injectable({
  providedIn: 'root',
})
export class GetDistrictsService {
  constructor(private http: HttpClient) {}

  getDistricts() {
    const url = 'http://localhost:5000/api/get/districts';
    return <Observable<District[]>>this.http.get(url);
  }
}
