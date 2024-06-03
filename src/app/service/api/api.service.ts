import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getMethod<T>(url: string, options: Options): Observable<T> {
    return this.http.get<T>(url, options) as Observable<T>;
  }

  postMethod<T>(url: string, body: any, options: Options): Observable<T> {
    return this.http.post<T>(url, body, options) as Observable<T>;
  }

  putMethod<T>(url: string, body: any, options: Options): Observable<T> {
    return this.http.put<T>(url, body, options) as Observable<T>;
  }

  deleteMethod<T>(url: string, options: Options): Observable<T> {
    return this.http.delete<T>(url, options) as Observable<T>;
  }
}
