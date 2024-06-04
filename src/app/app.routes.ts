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
    children: [
      {
        path: 'create-trainee',
        title: 'Trainee Management | Create Trainee',
        loadComponent: () =>
          import(
            './components/trainee/create-trainee/create-trainee.component'
          ).then((m) => m.CreateTraineeComponent),
      },
      {
        path: 'create-bd',
        title: 'Trainee Management | Create BD',
        loadComponent: () =>
          import('./components/bd/create-bd/create-bd.component').then(
            (m) => m.CreateBDComponent
          ),
      },
      {
        path: 'create-trainer',
        title: 'Trainee Management | Create Trainer',
        loadComponent: () =>
          import(
            './components/trainer/create-trainer/create-trainer.component'
          ).then((m) => m.CreateTrainerComponent),
      },
      {
        path: 'view-user',
        title: 'Trainee Management | View User',
        loadComponent: () =>
          import('./components/admin/view-user/view-user.component').then(
            (m) => m.ViewUserComponent
          ),
      },
    ],
  },
];
