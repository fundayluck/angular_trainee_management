import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getEducationByTraineeDetail() {
    return this.apiService.getMethod(this.url + 'trainee-education', {
      observe: 'body',
    });
  }

  createEducation(body: any) {
    return this.apiService.postMethod(
      this.url + 'trainee-education/create',
      body,
      {
        observe: 'body',
      }
    );
  }

  updateEducation(id: string, body: any) {
    return this.apiService.putMethod(
      this.url + `trainee-education/${id}`,
      body,
      {
        observe: 'body',
      }
    );
  }

  deleteEducation(id: string) {
    return this.apiService.deleteMethod(this.url + `trainee-education/${id}`, {
      observe: 'body',
    });
  }
}
