import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  createTrainee(credential: any) {
    return this.apiService.postMethod(
      this.url + 'trainee-detail/create',
      credential,
      {
        observe: 'body',
      }
    );
  }

  createBD(credential: any) {
    return this.apiService.postMethod(
      this.url + 'bd-detail/create',
      credential,
      {
        observe: 'body',
      }
    );
  }

  createTrainer(credential: any) {
    return this.apiService.postMethod(this.url + 'trainer/create', credential, {
      observe: 'body',
    });
  }

  getAllUsers() {
    return this.apiService.getMethod(this.url + 'auth/users', {
      observe: 'body',
      responseType: 'json',
    });
  }
}
