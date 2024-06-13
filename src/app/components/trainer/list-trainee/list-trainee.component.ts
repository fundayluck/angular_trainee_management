import { Component } from '@angular/core';
import { TrainerService } from '../../../service/trainer/trainer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-trainee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-trainee.component.html',
  styleUrl: './list-trainee.component.css',
})
export class ListTraineeComponent {
  modal: boolean = false;
  trainees: any[] = [];
  selectedTrainee: any = null;
  editForm: any = {
    id: '',
    firstName: '',
    lastName: '',
    frontendGrade: null,
    backendGrade: null,
    mobileGrade: null,
  };

  constructor(
    private trainerService: TrainerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadTrainees();
  }

  loadTrainees() {
    this.trainerService.getListTrainee().subscribe({
      next: (res: any) => {
        this.trainees = res.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getGrade(grades: any[], status: string): string {
    const gradeObj = grades.find((g) => g.status === status);
    return gradeObj ? gradeObj.grade : '-';
  }

  getGradeId(grades: any[], status: string): string | undefined {
    const gradeObj = grades.find((g) => g.status === status);
    return gradeObj ? gradeObj.id : undefined;
  }

  getAverageGrade(grades: any[]): string {
    if (grades.length === 0) return '-';
    const total = grades.reduce((sum, g) => sum + g.grade, 0);
    return (total / grades.length).toFixed(2);
  }

  editTrainee(trainee: any): void {
    this.modal = true;
    this.selectedTrainee = trainee;
    const id = trainee.id || trainee.traineeGrade[0]?.id; // Take ID from traineeGrade if not at root
    this.editForm = {
      traineeDetailId: id,
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      frontendGrade: this.getGrade(trainee.traineeGrade, 'Frontend'),
      backendGrade: this.getGrade(trainee.traineeGrade, 'Backend'),
      mobileGrade: this.getGrade(trainee.traineeGrade, 'Mobile'),
    };
  }

  saveEdit(): void {
    if (!this.editForm.traineeDetailId) {
      this.toastr.error('Trainee ID is missing!', 'Error');
      return;
    }

    const grades = [
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Frontend'),
        status: 'Frontend',
        grade: this.editForm.frontendGrade,
      },
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Backend'),
        status: 'Backend',
        grade: this.editForm.backendGrade,
      },
      {
        id: this.getGradeId(this.selectedTrainee.traineeGrade, 'Mobile'),
        status: 'Mobile',
        grade: this.editForm.mobileGrade,
      },
    ];

    const createRequests = grades
      .filter((grade) => !grade.id)
      .map((grade) => ({
        traineeDetailId: this.editForm.traineeDetailId,
        status: grade.status,
        grade: grade.grade,
      }));

    const updateRequests = grades
      .filter((grade) => grade.id)
      .map((grade) => ({
        id: grade.id,
        status: grade.status,
        grade: grade.grade,
      }));

    Promise.all([
      ...createRequests.map((req) =>
        this.trainerService.createTraineeGrade(req).toPromise()
      ),
      ...updateRequests.map((req: any) =>
        this.trainerService
          .updateTraineeGrade(req.id, { status: req.status, grade: req.grade })
          .toPromise()
      ),
    ])
      .then((responses) => {
        this.modal = false;
        this.editForm = {
          id: '',
          firstName: '',
          lastName: '',
          frontendGrade: null,
          backendGrade: null,
          mobileGrade: null,
        };
        this.toastr.success('Trainee grades updated successfully', 'success');
        this.loadTrainees();
        this.selectedTrainee = null;
      })
      .catch((error) => {
        this.editForm = {
          id: '',
          firstName: '',
          lastName: '',
          frontendGrade: null,
          backendGrade: null,
          mobileGrade: null,
        };
        this.modal = false;
        this.toastr.error('Failed to update trainee grades', 'error');
        this.selectedTrainee = null;
      });
  }

  cancelEdit() {
    this.editForm = {
      id: '',
      firstName: '',
      lastName: '',
      frontendGrade: null,
      backendGrade: null,
      mobileGrade: null,
    };
    this.modal = false;
  }
}
