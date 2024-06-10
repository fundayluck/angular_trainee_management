import { Component } from '@angular/core';
import { BioComponent } from './bio/bio.component';
import { EducationComponent } from './education/education.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [BioComponent, EducationComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
