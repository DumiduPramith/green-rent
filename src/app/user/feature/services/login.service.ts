import { LoginInterface } from './../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  Login(data: LoginInterface) {
    const url = 'http://localhost:5000/api/login';
    return this.http.post(url, data);
  }
}
