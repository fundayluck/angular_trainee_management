import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../common/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { SkillService } from '../../../../service/trainee/skill.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css',
})
export class SkillComponent {
  modal: boolean = false;
  isEditing: string = '';
  skills: any[] = [];
  availableSkills: any[] = [];

  skillForm = new FormGroup({
    skill: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  constructor(
    private toastr: ToastrService,
    private skillService: SkillService
  ) {
    this.getSkillByTraineeDetail();
    this.getAvailableSkills();
  }

  getAvailableSkills() {
    this.skillService.getAllSkills().subscribe({
      next: (res: any) => {
        this.availableSkills = res.data.map(({ id, skillName }: any) => {
          return { id, skillName };
        });
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  getSkillByTraineeDetail() {
    this.skillService.getSkillByTraineeDetail().subscribe({
      next: (res: any) => {
        this.skills = res.data;
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  createSkill() {
    this.skillService.createSkill(this.skillForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Skill added successfully', 'success');
        this.skillForm.reset();
        this.modal = false;
        this.getSkillByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  deleteSkill(id: string) {
    this.skillService.deleteSkill(id).subscribe({
      next: (res) => {
        this.toastr.success('Skill deleted successfully', 'success');
        this.getSkillByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  AddSkill() {
    this.modal = true;
  }

  doEditSkill(id: any) {
    this.skillService.getSkillById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        let setLevel = res.data.level;
        this.skillForm.patchValue({
          skill: res.data.skill,
          level: setLevel.toUpperCase(),
        });
        this.modal = true;
        this.isEditing = id;
      },
      error: (error: any) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  editSkill() {
    this.skillService
      .updateSkill(this.isEditing, this.skillForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Skill updated successfully', 'Success');
          this.skillForm.reset();
          this.modal = false;
          this.isEditing = '';
          this.getSkillByTraineeDetail();
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Error');
          this.skillForm.reset();
          this.modal = false;
          this.isEditing = '';
          this.getSkillByTraineeDetail();
        },
      });
  }

  cancelAdd() {
    this.modal = false;

    this.skillForm.reset();
  }
}
