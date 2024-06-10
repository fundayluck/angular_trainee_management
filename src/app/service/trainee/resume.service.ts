import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) {}

  getTraineeDetails() {
    return this.http.get(`${this.url}/trainee-detail/profile`);
  }
}
