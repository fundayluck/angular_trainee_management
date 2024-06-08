import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SidebarItems, UserInfo } from '../../types/types';
import { MatIconModule } from '@angular/material/icon';
import { SidebarItemsCustom } from '../../types/sidebarItems';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  userInfo: UserInfo = { role: '', email: '' };
  visibleSidebar: boolean = false;
  visibleAvatar: boolean = false;
  sidebarItems: SidebarItems[] = [];

  constructor(
    private router: Router,
    private sidebarService: SidebarItemsCustom
  ) {
    const user = localStorage.getItem('userinfo');
    this.userInfo = JSON.parse(user || '{}');

    this.sidebarService.sidebarItems$.subscribe((items) => {
      this.sidebarItems = items;
    });
  }

  ngOnInit() {
    this.sidebarService.sidebarItems$.subscribe((items) => {
      this.sidebarItems = items;
    });
  }

  items = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.toProfile();
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.logOut();
      },
    },
  ];

  toggleAvatar() {
    this.visibleAvatar = !this.visibleAvatar;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('p-menu') && !target.closest('img')) {
      this.visibleAvatar = false;
    }
  }

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  isOpen: boolean[] = [false, false]; // Manage the state of each accordion item

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.visibleSidebar = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    this.router.navigateByUrl('/signin').then(() => {
      window.location.reload();
    });
  }

  changeUserRole(newRole: string) {
    const updatedUserInfo: UserInfo = { ...this.userInfo, role: newRole };
    this.sidebarService.updateUserInfo(updatedUserInfo);
  }
}
