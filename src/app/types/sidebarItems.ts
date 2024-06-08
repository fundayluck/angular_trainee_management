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
              to: 'create-trainee',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Resume',
              to: 'create-bd',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Grades',
              to: 'create-trainer',
              icon: 'pi pi-fw pi-user-plus',
            },
          ],
        },
        {
          label: 'Vacancy',
          to: '/view-user',
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
