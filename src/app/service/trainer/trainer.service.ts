import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getListTrainee() {
    return this.apiService.getMethod(`${this.url}trainee-grade`, {
      observe: 'body',
    });
  }

  createTraineeGrade(data: any) {
    return this.apiService.postMethod(`${this.url}trainee-grade/create`, data, {
      observe: 'body',
    });
  }

  updateTraineeGrade(id: string, gradeData: { status: string; grade: number }) {
    return this.apiService.putMethod(
      `${this.url}trainee-grade/${id}`,
      {
        grade: gradeData.grade,
      },
      {
        observe: 'body',
      }
    );
  }
}
