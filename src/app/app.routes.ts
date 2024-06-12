import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { traineeGuard } from './guard/trainee.guard';
import { bdGuard } from './guard/bd.guard';
import { trainerGuard } from './guard/trainer.guard';
import { UserInfo } from './types/types';

const info = localStorage.getItem('userinfo');
const userInfo: UserInfo = JSON.parse(info || '{}');

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
        path: '',
        redirectTo:
          userInfo?.role === 'ADMIN'
            ? 'view-user'
            : userInfo?.role === 'BUSINESS_DEVELOPMENT'
            ? 'vacancy-bd'
            : userInfo?.role === 'TRAINEE'
            ? 'vacancy'
            : userInfo?.role === 'TRAINER'
            ? 'dashboard-trainer'
            : '',
        pathMatch: 'full',
      },
      {
        path: 'create-trainee',
        title: 'Admin | Create Trainee',
        loadComponent: () =>
          import(
            './components/admin/create-trainee/create-trainee.component'
          ).then((m) => m.CreateTraineeComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'create-bd',
        title: 'Admin | Create BD',
        loadComponent: () =>
          import('./components/admin/create-bd/create-bd.component').then(
            (m) => m.CreateBDComponent
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'create-trainer',
        title: 'Admin | Create Trainer',
        loadComponent: () =>
          import(
            './components/admin/create-trainer/create-trainer.component'
          ).then((m) => m.CreateTrainerComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'view-user',
        title: 'Admin | View User',
        loadComponent: () =>
          import('./components/admin/view-user/view-user.component').then(
            (m) => m.ViewUserComponent
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'account',
        title: 'Trainee | Account',
        loadComponent: () =>
          import('./components/trainee/account/account.component').then(
            (m) => m.AccountComponent
          ),
        canActivate: [traineeGuard],
      },
      {
        path: 'resume',
        title: 'Trainee | Resume',
        loadComponent: () =>
          import('./components/trainee/resume/resume.component').then(
            (m) => m.ResumeComponent
          ),
        canActivate: [traineeGuard],
      },
      {
        path: 'grades',
        title: 'Trainee | Grades',
        loadComponent: () =>
          import('./components/trainee/grades/grades.component').then(
            (m) => m.GradesComponent
          ),
        canActivate: [traineeGuard],
      },
      {
        path: 'vacancy',
        title: 'Trainee | Vacancy',
        loadComponent: () =>
          import('./components/trainee/vacancy/vacancy.component').then(
            (m) => m.VacancyComponent
          ),
        canActivate: [traineeGuard],
      },
      {
        path: 'account-bd',
        title: 'BD | Account',
        loadComponent: () =>
          import('./components/bd/account/account.component').then(
            (m) => m.AccountComponent
          ),
        canActivate: [bdGuard],
      },
      {
        path: 'dashboard-bd',
        title: 'BD | Dashboard',
        loadComponent: () =>
          import('./components/bd/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [bdGuard],
      },
      {
        path: 'applicants',
        title: 'BD | Applicants',
        loadComponent: () =>
          import('./components/bd/aplicant/aplicant.component').then(
            (m) => m.AplicantComponent
          ),
        canActivate: [bdGuard],
      },
      {
        path: 'vacancy-bd',
        title: 'BD | Vacancy',
        loadComponent: () =>
          import('./components/bd/vacancy/vacancy.component').then(
            (m) => m.VacancyComponent
          ),
        canActivate: [bdGuard],
      },
      {
        path: 'clients',
        title: 'BD | Clients',
        loadComponent: () =>
          import('./components/bd/clients/clients.component').then(
            (m) => m.ClientsComponent
          ),
        canActivate: [bdGuard],
      },
      {
        path: 'account-trainer',
        title: 'Trainer | Account',
        loadComponent: () =>
          import('./components/trainer/account/account.component').then(
            (m) => m.AccountComponent
          ),
        canActivate: [trainerGuard],
      },
      {
        path: 'dashboard-trainer',
        title: 'Trainer | Dashboard',
        loadComponent: () =>
          import('./components/trainer/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [trainerGuard],
      },
      {
        path: 'list-of-trainees',
        title: 'Trainer | List of Trainees',
        loadComponent: () =>
          import(
            './components/trainer/list-trainee/list-trainee.component'
          ).then((m) => m.ListTraineeComponent),
        canActivate: [trainerGuard],
      },
      {
        path: 'permission-denied',
        title: 'Permission Denied',
        loadComponent: () =>
          import(
            './components/permission-denied/permission-denied.component'
          ).then((m) => m.PermissionDeniedComponent),
      },
    ],
  },
  {
    path: 'unauthorized',
    title: 'Unauthorized',
    loadComponent: () =>
      import('./components/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },
];
