import { Component } from '@angular/core';
import { BioComponent } from './bio/bio.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [BioComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
