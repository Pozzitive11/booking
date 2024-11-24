import { Injectable, signal, computed, inject } from '@angular/core';
import { BookingService } from './booking.service';
import { UtilsFunctions } from '../utils/utils.functions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private bookingService = inject(BookingService);

  private _selectedDatesRange = signal<string[]>([]);
  selectedDatesRange = computed(() => this._selectedDatesRange());
  selectedCheckInDate = computed(() => this.selectedDatesRange()[0]);
  selectedCheckOutDate = computed(
    () => this.selectedDatesRange()[this.selectedDatesRange().length - 1]
  );
  selectedDatesRangeCount = computed(() => this.selectedDatesRange().length);

  private _amountOfPeople = signal<number>(1);
  amountOfPeople = computed(() => this._amountOfPeople());

  updateSelectedDates(checkIn: Date, checkOut: Date): void {
    const selectedDatesRange = UtilsFunctions.getDatesInRange(
      checkIn,
      checkOut
    );
    this._selectedDatesRange.set(selectedDatesRange);
  }

  searchRooms(checkIn: Date, checkOut: Date, people: number): void {
    this.updateSelectedDates(checkIn, checkOut);
    this._amountOfPeople.set(people);
    this.bookingService.filterRooms(this.selectedDatesRange(), people);
  }

  clearSelectedDates(): void {
    this._selectedDatesRange.set([]);
  }
}
