import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../common/input/input.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-bd',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, MatIconModule],
  templateUrl: './create-bd.component.html',
  styleUrl: './create-bd.component.css',
})
export class CreateBDComponent {
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
  });

  constructor(private service: UserService, private toastr: ToastrService) {}

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.service
      .createBD(this.createForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.createForm.reset();
          this.toastr.success('Successfully created BD', 'Success');
        },
        error: (err) => {
          this.toastr.error(err.errors, 'Error');
        },
      });
  }
}
