import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../common/input/input.component';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-trainee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, MatIconModule],
  templateUrl: './create-trainee.component.html',
  styleUrl: './create-trainee.component.css',
})
export class CreateTraineeComponent {
  isLoading = false;
  createForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    firstName: new FormControl('', [Validators.required]),
    batch: new FormControl('', [Validators.required]),
    joinedAt: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    console.log(this.createForm.value);
    this.isLoading = true;
    this.service
      .createTrainee(this.createForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.createForm.reset();
          this.toastr.success('Successfully created', 'Success');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.errors, 'Error');
        },
      });
  }
}
