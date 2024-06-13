import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getTraineeGrades() {
    return this.apiService.getMethod(`${this.url}trainee-grade/trainee`, {
      observe: 'body',
    });
  }
}
