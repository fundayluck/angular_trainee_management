import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  isLoading = false;
  users: any[] = [];
  setError: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService
      .getAllUsers()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.users = res.data;
        },
        error: (err) => {
          this.setError = err.error.message;
        },
      });
  }
}
