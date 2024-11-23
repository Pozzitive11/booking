import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { addDays, isBefore } from 'date-fns';
import { CommonModule } from '@angular/common';
import { hotelRooms } from '../../DB';
import { RoomCardComponent } from '../room-card/room-card.component';
import { UtilsFunctions } from '../../utils/utils.functions';
@Component({
  selector: 'app-search',
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
    RoomCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true,
})
export class SearchComponent implements OnInit {
  private fb = inject(FormBuilder);
  searchForm: FormGroup;
  minDate = signal<Date | null>(null);
  filteredRooms = hotelRooms;

  get checkInDateControl(): FormControl {
    return this.searchForm.get('checkInDate') as FormControl;
  }
  get checkOutDateControl(): FormControl {
    return this.searchForm.get('checkOutDate') as FormControl;
  }
  get roomsControl(): FormControl {
    return this.searchForm.get('rooms') as FormControl;
  }
  get peopleControl(): FormControl {
    return this.searchForm.get('people') as FormControl;
  }
  get bookingTypeControl(): FormControl {
    return this.searchForm.get('bookingType') as FormControl;
  }

  ngOnInit() {
    this.initializeForm();
    this.minDate.set(new Date());
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      checkInDate: [null, [Validators.required, this.dateRangeValidator]],
      checkOutDate: [null, [Validators.required, this.dateRangeValidator]],
      rooms: [1, [Validators.required, Validators.min(1)]],
      people: [1, [Validators.required, Validators.min(1)]],
      bookingType: ['self', Validators.required],
    });
  }

  increaseValue(controlName: string): void {
    const currentValue = this.searchForm.get(controlName)?.value || 0;
    this.searchForm.get(controlName)?.setValue(currentValue + 1);
  }

  decreaseValue(controlName: string): void {
    const currentValue = this.searchForm.get(controlName)?.value || 0;
    if (currentValue > 1) {
      this.searchForm.get(controlName)?.setValue(currentValue - 1);
    }
  }

  onSearch(): void {
    const { checkInDate, checkOutDate, rooms, people } = this.searchForm.value;

    // Перетворюємо вибрані дати в локальний формат ISO
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Генеруємо всі дати між checkIn і checkOut
    const selectedDates: string[] = UtilsFunctions.getDatesInRange(
      checkIn,
      checkOut
    );

    // Фільтруємо номери за кількістю кімнат, гостей та доступними датами
    this.filteredRooms = hotelRooms.filter((room) => {
      const hasAvailability = selectedDates.every((date) =>
        room.availableDates.includes(date)
      );

      return room.maxGuests >= people && room.availability && hasAvailability;
    });

    console.log('Відфільтровані номери:', this.filteredRooms);
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const today = new Date();
    const maxDate = addDays(today, 30);

    if (isBefore(value, today) || isBefore(maxDate, value)) {
      return { dateRange: true };
    }

    return null;
  }
}
