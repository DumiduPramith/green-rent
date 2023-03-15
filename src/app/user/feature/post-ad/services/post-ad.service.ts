import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostAdService {
  constructor(private http: HttpClient) {}

  postAd(data: FormData) {
    const url = 'http://localhost:5000/api/post-ad';
    return this.http.post(url, data);
  }
}
