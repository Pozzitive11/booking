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
import { dateRangeValidator } from '../../validators/date-range.validator';
import { BookingService } from '../../services/booking.service';
import { SearchService } from '../../services/search.service';

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
  protected bookingService = inject(BookingService);
  protected searchService = inject(SearchService);

  searchForm: FormGroup;
  minDate = signal<Date>(new Date());

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
  // get bookingTypeControl(): FormControl {
  //   return this.searchForm.get('bookingType') as FormControl;
  // }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      checkInDate: [null, [Validators.required, dateRangeValidator]],
      checkOutDate: [null, [Validators.required, dateRangeValidator]],
      rooms: [1, [Validators.required, Validators.min(1)]],
      people: [1, [Validators.required, Validators.min(1)]],
      // bookingType: ['self', Validators.required],
    });
  }

  increaseValue(controlName: string, event: Event): void {
    event.preventDefault();
    const control = this.searchForm.get(controlName);
    const currentValue = control?.value || 0;
    control?.setValue(currentValue + 1);
  }

  decreaseValue(controlName: string, event: Event): void {
    event.preventDefault();
    const control = this.searchForm.get(controlName);
    const currentValue = control?.value || 0;
    if (currentValue > 1) {
      control?.setValue(currentValue - 1);
    }
  }
  onSearch(): void {
    const { checkInDate, checkOutDate, rooms, people } = this.searchForm.value;

    if (checkInDate && checkOutDate) {
      this.searchService.searchRooms(
        new Date(checkInDate),
        new Date(checkOutDate),
        rooms,
        people
      );
    }
  }
}
