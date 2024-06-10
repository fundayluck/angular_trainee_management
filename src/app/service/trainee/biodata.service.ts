import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BiodataService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getTraineeDetails() {
    return this.apiService.getMethod(`${this.url}trainee-detail/profile`, {
      observe: 'body',
    });
  }

  updateTraineeDetails(credentials: any) {
    return this.apiService.putMethod(`${this.url}trainee-detail`, credentials, {
      observe: 'body',
    });
  }
}
