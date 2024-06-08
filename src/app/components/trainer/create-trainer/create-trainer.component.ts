import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../common/input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-trainer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, MatIconModule],
  templateUrl: './create-trainer.component.html',
  styleUrl: './create-trainer.component.css',
})
export class CreateTrainerComponent {
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
  });

  constructor(private service: UserService, private toastr: ToastrService) {}

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.service
      .createTrainer(this.createForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.createForm.reset();
          this.toastr.success('Successfully created trainee', 'Success');
        },
        error: (err) => {
          this.toastr.error(err.errors, 'Error');
        },
      });
  }
}
