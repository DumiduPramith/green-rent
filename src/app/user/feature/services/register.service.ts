import { RegisterInterface } from './../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  RegisterStudent(data: RegisterInterface) {
    const url = 'http://localhost:5000/api/register';
    return this.http.post(url, data);
  }
}
