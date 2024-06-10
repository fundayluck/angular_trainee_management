import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EducationService } from '../../../../service/trainee/education.service';
import { InputComponent } from '../../../common/input/input.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, CommonModule, MatIconModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  modal: boolean = false;

  educations: any[] = [];
  constructor(
    private educationService: EducationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEducationByTraineeDetail();
  }

  educationForm = new FormGroup({
    institutionName: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
    graduationYear: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),
    gpaScore: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(4),
    ]),
  });

  createEducation(): void {
    this.educationService.createEducation(this.educationForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'Success');
        this.modal = false;
        this.educationForm.reset();
        this.getEducationByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  getEducationByTraineeDetail(): void {
    this.educationService.getEducationByTraineeDetail().subscribe(
      (res: any) => {
        if (Array.isArray(res.data)) {
          this.educations = res.data.map((education: any) => {
            return {
              id: education.id,
              institutionName: education.institutionName,
              fieldOfStudy: education.fieldOfStudy,
              graduationYear: education.graduationYear,
              cgpa: education.cgpa,
              isEditing: false,
            };
          });
        } else {
          console.error('Invalid data format:', res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEducation(id: string): void {
    this.educationService.deleteEducation(id).subscribe({
      next: (res) => {
        this.toastr.success('Education deleted successfully', 'Success');
        this.getEducationByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  addEducation() {
    this.modal = true;
  }

  cancelAdd() {
    this.modal = false;
    this.educationForm.reset();
  }
}
