import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../../common/input/input.component';
import { BiodataService } from '../../../../service/trainee/biodata.service';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, MatIconModule],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css',
})
export class BioComponent {
  isEditing: boolean = false;
  traineeDetail: any;
  isLoading: boolean = false;

  editBio() {
    this.traineeDetailForm.get('firstName')?.enable();
    this.traineeDetailForm.get('lastName')?.enable();
    this.traineeDetailForm.get('dateOfBirth')?.enable();
    this.traineeDetailForm.get('placeOfBirth')?.enable();
    this.traineeDetailForm.get('phone')?.enable();

    this.isEditing = true;
  }

  constructor(
    private toastr: ToastrService,
    private biodataService: BiodataService
  ) {}

  traineeDetailForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    joinedAt: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    firstName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    lastName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    dateOfBirth: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    placeOfBirth: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    phone: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern('^[0-9-+s()]*$'),
    ]),
  });

  saveTraineeDetail() {
    if (this.traineeDetailForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.traineeDetailForm.get('email')?.enable();
    console.log(this.traineeDetailForm.value);

    this.biodataService
      .updateTraineeDetails(this.traineeDetailForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.isEditing = false;
          this.traineeDetailForm.get('email')?.disable();
          this.traineeDetailForm.get('firstName')?.disable();
          this.traineeDetailForm.get('lastName')?.disable();
          this.traineeDetailForm.get('dateOfBirth')?.disable();
          this.traineeDetailForm.get('placeOfBirth')?.disable();
          this.traineeDetailForm.get('phone')?.disable();

          this.toastr.success(res.message, 'Success');
        },
        error: (err) => {
          this.isEditing = false;
          this.traineeDetailForm.get('email')?.disable();
          this.traineeDetailForm.get('firstName')?.disable();
          this.traineeDetailForm.get('lastName')?.disable();
          this.traineeDetailForm.get('dateOfBirth')?.disable();
          this.traineeDetailForm.get('placeOfBirth')?.disable();
          this.traineeDetailForm.get('phone')?.disable();

          this.toastr.error(err.error.message, 'Error');
        },
      });
  }

  ngOnInit(): void {
    this.loadTraineeDetail();
  }

  loadTraineeDetail(): void {
    this.biodataService
      .getTraineeDetails()
      .pipe()
      .subscribe({
        next: (res: any) => {
          let date = res.data.joinedAt.split('T')[0];
          let dateBirth = res.data.dateOfBirth.split('T')[0];
          console.log(res);
          this.traineeDetailForm.patchValue({
            email: res.data.email,
            joinedAt: date,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dateOfBirth: dateBirth,
            placeOfBirth: res.data.placeOfBirth,
            phone: res.data.phone,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancelEdit() {
    this.isEditing = false;

    this.traineeDetailForm.get('email')?.disable();
    this.traineeDetailForm.get('firstName')?.disable();
    this.traineeDetailForm.get('lastName')?.disable();
    this.traineeDetailForm.get('dateOfBirth')?.disable();
    this.traineeDetailForm.get('placeOfBirth')?.disable();
    this.traineeDetailForm.get('phone')?.disable();
  }
}
