import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BiodataService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getProfileTrainer() {
    return this.apiService.getMethod(`${this.url}trainer/profile`, {
      observe: 'body',
    });
  }

  updateProfileTrainer(body: any) {
    return this.apiService.putMethod(`${this.url}trainer`, body, {
      observe: 'body',
    });
  }
}
