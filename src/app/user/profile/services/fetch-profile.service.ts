import { ProfileHttpInterface } from './../interfaces/profile-http.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(userId: number) {
    const url = `http://localhost:5000/api/get/user/${userId}`;
    return this.http.get<ProfileHttpInterface>(url);
  }
}
