import { Injectable, signal, computed, inject } from '@angular/core';
import { BookingService } from './booking.service';
import { UtilsFunctions } from '../utils/utils.functions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private bookingService = inject(BookingService);

  private _selectedDates = signal<string[]>([]);
  selectedDates = computed(() => this._selectedDates());

  updateSelectedDates(checkIn: Date, checkOut: Date): void {
    const selectedDates = UtilsFunctions.getDatesInRange(checkIn, checkOut);
    this._selectedDates.set(selectedDates); // Update signal
  }

  searchRooms(
    checkIn: Date,
    checkOut: Date,
    rooms: number,
    people: number
  ): void {
    this.updateSelectedDates(checkIn, checkOut);
    this.bookingService.filterRooms(this.selectedDates(), rooms, people);
  }
}
