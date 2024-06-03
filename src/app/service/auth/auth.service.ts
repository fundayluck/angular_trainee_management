import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/api/v1/auth';
  constructor(private apiService: ApiService) {}

  signin(credential: any) {
    return this.apiService.postMethod(this.url + '/signin', credential, {
      observe: 'body',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}
