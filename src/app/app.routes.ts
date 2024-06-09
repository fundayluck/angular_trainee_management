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
        title: 'Admin | Create Trainee',
        loadComponent: () =>
          import(
            './components/admin/create-trainee/create-trainee.component'
          ).then((m) => m.CreateTraineeComponent),
      },
      {
        path: 'create-bd',
        title: 'Admin | Create BD',
        loadComponent: () =>
          import('./components/admin/create-bd/create-bd.component').then(
            (m) => m.CreateBDComponent
          ),
      },
      {
        path: 'create-trainer',
        title: 'Admin | Create Trainer',
        loadComponent: () =>
          import(
            './components/admin/create-trainer/create-trainer.component'
          ).then((m) => m.CreateTrainerComponent),
      },
      {
        path: 'view-user',
        title: 'Admin | View User',
        loadComponent: () =>
          import('./components/admin/view-user/view-user.component').then(
            (m) => m.ViewUserComponent
          ),
      },
      {
        path: 'account',
        title: 'Trainee | Account',
        loadComponent: () =>
          import('./components/trainee/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      {
        path: 'resume',
        title: 'Trainee | Resume',
        loadComponent: () =>
          import('./components/trainee/resume/resume.component').then(
            (m) => m.ResumeComponent
          ),
      },
      {
        path: 'grades',
        title: 'Trainee | Grades',
        loadComponent: () =>
          import('./components/trainee/grades/grades.component').then(
            (m) => m.GradesComponent
          ),
      },
      {
        path: 'vacancy',
        title: 'Trainee | Vacancy',
        loadComponent: () =>
          import('./components/trainee/vacancy/vacancy.component').then(
            (m) => m.VacancyComponent
          ),
      },
      {
        path: 'account-bd',
        title: 'BD | Account',
        loadComponent: () =>
          import('./components/bd/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      {
        path: 'dashboard-bd',
        title: 'BD | Dashboard',
        loadComponent: () =>
          import('./components/bd/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'applicants',
        title: 'BD | Applicants',
        loadComponent: () =>
          import('./components/bd/aplicant/aplicant.component').then(
            (m) => m.AplicantComponent
          ),
      },
      {
        path: 'vacancy-bd',
        title: 'BD | Vacancy',
        loadComponent: () =>
          import('./components/bd/vacancy/vacancy.component').then(
            (m) => m.VacancyComponent
          ),
      },
      {
        path: 'clients',
        title: 'BD | Clients',
        loadComponent: () =>
          import('./components/bd/clients/clients.component').then(
            (m) => m.ClientsComponent
          ),
      },
      {
        path: 'account-trainer',
        title: 'Trainer | Account',
        loadComponent: () =>
          import('./components/trainer/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      {
        path: 'dashboard-trainer',
        title: 'Trainer | Dashboard',
        loadComponent: () =>
          import('./components/trainer/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'list-of-trainees',
        title: 'Trainer | List of Trainees',
        loadComponent: () =>
          import(
            './components/trainer/list-trainee/list-trainee.component'
          ).then((m) => m.ListTraineeComponent),
      },
    ],
  },
];
