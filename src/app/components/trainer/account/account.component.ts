import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BiodataService } from '../../../service/trainer/biodata.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { InputComponent } from '../../common/input/input.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, MatIconModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  isEditing: boolean = false;
  isLoading: boolean = false;

  editBio() {
    this.trainerDetailForm.get('firstName')?.enable();
    this.trainerDetailForm.get('lastName')?.enable();

    this.isEditing = true;
  }

  constructor(
    private toastr: ToastrService,
    private biodataService: BiodataService
  ) {}

  trainerDetailForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),

    role: new FormControl({ value: '', disabled: true }, [Validators.required]),
    batch: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    firstName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    lastName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  saveTrainerDetail() {
    if (this.trainerDetailForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.trainerDetailForm.get('email')?.enable();
    this.trainerDetailForm.get('role')?.enable();
    this.trainerDetailForm.get('batch')?.enable();

    this.biodataService
      .updateProfileTrainer(this.trainerDetailForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.isEditing = false;
          this.trainerDetailForm.get('email')?.disable();
          this.trainerDetailForm.get('role')?.disable();
          this.trainerDetailForm.get('batch')?.disable();
          this.trainerDetailForm.get('firstName')?.disable();
          this.trainerDetailForm.get('lastName')?.disable();

          this.toastr.success(res.message, 'Success');
        },
        error: (err) => {
          this.isEditing = false;
          this.trainerDetailForm.get('email')?.disable();
          this.trainerDetailForm.get('role')?.disable();
          this.trainerDetailForm.get('batch')?.disable();
          this.trainerDetailForm.get('firstName')?.disable();
          this.trainerDetailForm.get('lastName')?.disable();

          this.toastr.error(err.error.message, 'Error');
        },
      });
  }

  ngOnInit(): void {
    this.loadTrainerDetail();
  }

  loadTrainerDetail(): void {
    this.biodataService
      .getProfileTrainer()
      .pipe()
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.trainerDetailForm.patchValue({
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            batch: res.data.batch,
            role: res.data.role,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancelEdit() {
    this.isEditing = false;

    this.trainerDetailForm.get('firstName')?.disable();
    this.trainerDetailForm.get('lastName')?.disable();
  }
}
