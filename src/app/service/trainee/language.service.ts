import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}
  getAllLanguages() {
    return this.apiService.getMethod(`${this.url}m-language`, {
      observe: 'body',
    });
  }

  createLanguage(data: any) {
    return this.apiService.postMethod(
      `${this.url}trainee-language/create`,
      data,
      {
        observe: 'body',
      }
    );
  }

  getLanguageById(id: string) {
    return this.apiService.getMethod(`${this.url}trainee-language/${id}`, {
      observe: 'body',
    });
  }

  getLanguageByTraineeDetail() {
    return this.apiService.getMethod(`${this.url}trainee-language`, {
      observe: 'body',
    });
  }

  updateLanguage(id: string, data: any) {
    return this.apiService.putMethod(
      `${this.url}trainee-language/${id}`,
      data,
      {
        observe: 'body',
      }
    );
  }

  deleteLanguage(id: string) {
    return this.apiService.deleteMethod(`${this.url}/trainee-language/${id}`, {
      observe: 'body',
    });
  }
}
