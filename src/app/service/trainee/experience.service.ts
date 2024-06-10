import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  createExperience(data: any) {
    return this.apiService.postMethod(
      `${this.url}trainee-experience/create`,
      data,
      {
        observe: 'body',
      }
    );
  }
  getExperienceByTraineeDetail() {
    return this.apiService.getMethod(`${this.url}trainee-experience`, {
      observe: 'body',
    });
  }
  updateExperience(id: string, data: any) {
    return this.apiService.putMethod(
      `${this.url}trainee-experience/${id}`,
      data,
      {
        observe: 'body',
      }
    );
  }
  deleteExperience(id: string) {
    return this.apiService.deleteMethod(`${this.url}trainee-experience/${id}`, {
      observe: 'body',
    });
  }
}
