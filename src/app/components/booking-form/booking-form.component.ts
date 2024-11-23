import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  formSubmit = output<FormGroup>();
  bookingForm: FormGroup;

  get bookingTypeControl(): FormControl {
    return this.bookingForm.get('bookingType') as FormControl;
  }
  get fullNameControl(): FormControl {
    return this.bookingForm.get('fullName') as FormControl;
  }
  get emailControl(): FormControl {
    return this.bookingForm.get('email') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.bookingForm.get('phone') as FormControl;
  }
  get notesControl(): FormControl {
    return this.bookingForm.get('notes') as FormControl;
  }

  get agencyNameControl(): FormControl {
    return this.bookingForm.get('agencyName') as FormControl;
  }
  get agentNameControl(): FormControl {
    return this.bookingForm.get('agentName') as FormControl;
  }
  get mealOptionControl(): FormControl {
    return this.bookingForm.get('mealOption') as FormControl;
  }
  ngOnInit(): void {
    this.initializeForm();
    this.setupDynamicValidation();
  }
  initializeForm(): void {
    this.bookingForm = this.fb.group({
      bookingType: ['self', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      notes: [''],
      agencyName: [''],
      agentName: [''],
      mealOption: ['breakfast-lunch'],
    });
  }

  setupDynamicValidation(): void {
    this.bookingTypeControl.valueChanges.subscribe((bookingType) => {
      if (bookingType === 'agency') {
        this.agencyNameControl.setValidators([Validators.required]);
        this.agentNameControl.setValidators([Validators.required]);
      } else {
        this.agencyNameControl.clearValidators();
        this.agentNameControl.clearValidators();
      }
      this.agencyNameControl.updateValueAndValidity();
      this.agentNameControl.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.bookingForm.valid) {
      this.formSubmit.emit(this.bookingForm.value);
    }
  }
}
