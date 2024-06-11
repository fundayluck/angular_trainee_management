import { Component } from '@angular/core';
import { BioComponent } from './bio/bio.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillComponent } from './skill/skill.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    BioComponent,
    EducationComponent,
    ExperienceComponent,
    SkillComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
