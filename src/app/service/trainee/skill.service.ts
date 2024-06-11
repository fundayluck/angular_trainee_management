import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  getAllSkills() {
    return this.apiService.getMethod(`${this.url}m-skill`, {
      observe: 'body',
    });
  }

  getSkillById(id: string) {
    return this.apiService.getMethod(`${this.url}trainee-skill/${id}`, {
      observe: 'body',
    });
  }

  getSkillByTraineeDetail() {
    return this.apiService.getMethod(`${this.url}trainee-skill`, {
      observe: 'body',
    });
  }

  createSkill(data: any) {
    return this.apiService.postMethod(`${this.url}trainee-skill/create`, data, {
      observe: 'body',
    });
  }

  updateSkill(id: string, data: any) {
    return this.apiService.putMethod(`${this.url}trainee-skill/${id}`, data, {
      observe: 'body',
    });
  }

  deleteSkill(id: string) {
    return this.apiService.deleteMethod(`${this.url}trainee-skill/${id}`, {
      observe: 'body',
    });
  }
}
