import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserInfo } from '../../types/types';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    DividerModule,
    AccordionModule,
    RouterLink,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  userInfo!: UserInfo;
  visibleSidebar: boolean = false;
  visibleAvatar: boolean = false;

  toggleAvatar() {
    this.visibleAvatar = !this.visibleAvatar;
  }

  constructor(private router: Router, private messageService: MessageService) {
    const user = localStorage.getItem('userinfo');
    this.userInfo = JSON.parse(user || '');
    console.log(this.userInfo.role);
  }

  sidebarItems = [
    {
      label: 'Create user',

      child: [
        {
          label: 'Create Trainee',
          to: 'create-trainee',
          icon: 'pi pi-fw pi-user-plus',
        },
        { label: 'Create BD', to: 'create-bd', icon: 'pi pi-fw pi-user-plus' },
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
  ];

  items = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.visibleSidebar = false;
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'logout Successful',
        });
      },
    },
  ];

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('p-menu') && !target.closest('.p-avatar')) {
      this.visibleAvatar = false;
    }
  }

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }
}
