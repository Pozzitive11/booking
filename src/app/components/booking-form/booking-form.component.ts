import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-booking-form',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
  standalone: true,
})
export class BookingFormComponent {
  formSubmit = output<FormGroup>();

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      phone: ['', Validators.required],
      notes: [''],
    });
  }

  submit(): void {
    if (this.bookingForm.valid) {
      this.formSubmit.emit(this.bookingForm);
    }
  }
}
