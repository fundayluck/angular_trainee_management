import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-permission-denied',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './permission-denied.component.html',
  styleUrl: './permission-denied.component.css',
})
export class PermissionDeniedComponent {}
