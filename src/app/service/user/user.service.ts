import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private apiService: ApiService) {}

  createTrainee(credential: any) {
    return this.apiService.postMethod(this.url + 'trainee-detail/create', credential,{
      observe: 'body',

    } );
  }
}
