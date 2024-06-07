import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserInfo } from '../../../types/types';
import { MatIconModule } from '@angular/material/icon';

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, MatIconModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  isShowPassword = false;
  isLoading = false;
  userInfo!: UserInfo;
  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
    }
  }

  signin() {
    this.isLoading = true;

    if (this.signinForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService
      .signin(this.signinForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.data.token);

          let role = jwtDecode<CustomJwtPayload>(response.data.token).role;
          console.log(role);

          this.userInfo = {
            email: response.data.email,
            role: role,
          };

          localStorage.setItem('userinfo', JSON.stringify(this.userInfo));

          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: 'Login Successful',
          // });
          this.router.navigate(['/']);
        },
        error: ({ error }) => {
          this.isLoading = false;
          this.signinForm.setErrors({
            message: error.message || 'Login failed',
          });
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: error.message || 'Login failed',
          // });
        },
      });
  }

  showErrors() {
    const { dirty, touched, errors } = this.signinForm;
    return dirty && touched && errors;
  }
}