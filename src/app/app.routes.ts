import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'signin',
    title: 'Trainee Management | Signin',
    loadComponent: () =>
      import('./components/auth/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  {
    path: '',
    title: 'Trainee Management | Home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
];
