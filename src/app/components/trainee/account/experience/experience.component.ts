import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExperienceService } from '../../../../service/trainee/experience.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../common/input/input.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, InputComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  modal: boolean = false;

  experiences: any[] = [];

  constructor(
    private toastr: ToastrService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.getExperienceByTraineeDetail();
  }

  experienceForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]),
  });

  createExperience(): void {
    if (this.experienceForm.invalid) {
      this.toastr.info('Please fill in all required fields correctly!', 'Info');

      return;
    }

    this.experienceService
      .createExperience(this.experienceForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Experience added successfully', 'success');
          this.experienceForm.reset();
          this.getExperienceByTraineeDetail();
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'error');
        },
      });
  }

  getExperienceByTraineeDetail(): void {
    this.experienceService.getExperienceByTraineeDetail().subscribe(
      (res: any) => {
        console.log(res);

        if (Array.isArray(res.data)) {
          this.experiences = res.data.map((experience: any) => ({
            ...experience,
            isEditing: false,
          }));
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editExperience(index: number) {
    this.experiences[index].isEditing = true;
  }

  saveExperience(index: number) {
    const updatedExperience = this.experiences[index];
    this.experienceService
      .updateExperience(updatedExperience.id, updatedExperience)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Experience updated successfully', 'success');
          this.experiences[index].isEditing = false;
          this.getExperienceByTraineeDetail();
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'error');
        },
      });
  }

  deleteExperience(experienceId: string): void {
    this.experienceService.deleteExperience(experienceId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Experience deleted successfully', 'success');
        this.getExperienceByTraineeDetail();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'error');
      },
    });
  }

  cancelAdd() {
    this.modal = false;
    this.experienceForm.reset();
  }
  addExperience() {
    this.modal = true;
  }
}
