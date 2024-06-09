import { Injectable } from '@angular/core';
import { SidebarItems, UserInfo } from './types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarItemsCustom {
  private sidebarItemsSubject = new BehaviorSubject<SidebarItems[]>([]);
  sidebarItems$ = this.sidebarItemsSubject.asObservable();
  userInfo: UserInfo = { role: '', email: '' };

  constructor() {
    this.initializeUserInfo();
    this.initializeSidebarItems();
  }

  private initializeUserInfo(): void {
    const user = localStorage.getItem('userinfo');
    this.userInfo = JSON.parse(user || '{}');
  }

  private initializeSidebarItems(): void {
    if (this.userInfo.role === 'ADMIN') {
      this.sidebarItemsSubject.next([
        {
          label: 'Create user',
          icon: '',
          child: [
            {
              label: 'Create Trainee',
              to: 'create-trainee',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Create BD',
              to: 'create-bd',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Create Trainer',
              to: 'create-trainer',
              icon: 'pi pi-fw pi-user-plus',
            },
          ],
        },
        {
          label: 'View user',
          to: '/view-user',
          icon: 'pi pi-fw pi-user-plus',
        },
      ]);
    } else if (this.userInfo.role === 'TRAINEE') {
      this.sidebarItemsSubject.next([
        {
          label: 'Profile',
          icon: '',
          child: [
            {
              label: 'Account',
              to: 'account',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Resume',
              to: 'resume',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Grades',
              to: 'grades',
              icon: 'pi pi-fw pi-user-plus',
            },
          ],
        },
        {
          label: 'Vacancy',
          to: '/vacancy',
          icon: 'pi pi-fw pi-user-plus',
        },
      ]);
    } else if (this.userInfo.role === 'BUSINESS_DEVELOPMENT') {
      this.sidebarItemsSubject.next([
        {
          label: 'Dashboard',
          to: '/dashboard-bd',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Profile',
          icon: '',
          to: 'account-bd',
        },
        {
          label: 'Applicants',
          to: '/applicants',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Vacancy',
          to: '/vacancy-bd',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Clients',
          to: '/clients',
          icon: 'pi pi-fw pi-user-plus',
        },
      ]);
    } else if (this.userInfo.role === 'TRAINER') {
      this.sidebarItemsSubject.next([
        {
          label: 'Dashboard',
          to: '/dashboard-trainer',
          icon: 'pi pi-fw pi-user-plus',
        },
        {
          label: 'Profile',
          icon: '',
          to: 'account-trainer',
        },
        {
          label: 'list of trainees',
          to: 'list-of-trainees',
          icon: 'pi pi-fw pi-user-plus',
        },
      ]);
    } else {
      this.sidebarItemsSubject.next([]);
    }
  }

  updateUserInfo(newUserInfo: UserInfo): void {
    this.userInfo = newUserInfo;
    localStorage.setItem('userinfo', JSON.stringify(this.userInfo));
    this.initializeSidebarItems();
  }

  getSidebarItems(): SidebarItems[] {
    return this.sidebarItemsSubject.getValue();
  }
}
