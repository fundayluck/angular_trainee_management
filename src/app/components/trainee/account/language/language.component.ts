import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LanguageService } from '../../../../service/trainee/language.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
})
export class LanguageComponent {
  modal: boolean = false;
  isEditing: string = '';
  languages: any[] = [];
  availableLanguages: any[] = [];

  LanguageForm = new FormGroup({
    language: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  });

  constructor(
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {
    this.getLanguagesByTraineeDetail();
    this.getAvailableLanguages();
    console.log(this.isEditing.length);
  }

  getAvailableLanguages() {
    this.languageService.getAllLanguages().subscribe({
      next: (res: any) => {
        console.log(res);

        this.availableLanguages = res.data.map(({ id, languageName }: any) => {
          return { id, languageName };
        });
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  getLanguagesByTraineeDetail() {
    this.languageService.getLanguageByTraineeDetail().subscribe({
      next: (res: any) => {
        this.languages = res.data;
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  createLanguage() {
    this.languageService.createLanguage(this.LanguageForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Language added successfully', 'success');
        this.LanguageForm.reset();
        this.modal = false;
        this.getLanguagesByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  deleteLanguage(id: string) {
    this.languageService.deleteLanguage(id).subscribe({
      next: (res) => {
        this.toastr.success('Language deleted successfully', 'success');
        this.getLanguagesByTraineeDetail();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }

  AddLanguage() {
    this.modal = true;
  }

  doEditLanguage(id: any) {
    this.languageService.getLanguageById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        let setLevel = res.data.level;
        this.LanguageForm.patchValue({
          language: res.data.language,
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

  editLanguage() {
    this.languageService
      .updateLanguage(this.isEditing, this.LanguageForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Skill updated successfully', 'Success');
          this.LanguageForm.reset();
          this.modal = false;
          this.isEditing = '';
          this.getLanguagesByTraineeDetail();
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Error');
          this.LanguageForm.reset();
          this.modal = false;
          this.isEditing = '';
          this.getLanguagesByTraineeDetail();
        },
      });
  }

  cancelAdd() {
    this.modal = false;

    this.LanguageForm.reset();
  }
}
