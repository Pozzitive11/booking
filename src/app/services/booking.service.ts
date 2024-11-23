import { computed, Injectable, signal } from '@angular/core';
import { Room } from '../models/room.model';
import { hotelRooms } from '../DB';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _hotelRooms = signal<Room[]>(hotelRooms);
  private _filteredRooms = signal<Room[]>(this._hotelRooms());

  hotelRooms = computed(() => this._hotelRooms());
  filteredRooms = computed(() => this._filteredRooms());

  filterRooms(selectedDates: string[], people: number): void {
    const filtered = this._hotelRooms().filter((room) => {
      const hasAvailability = selectedDates.every((date) =>
        room.availableDates.includes(date)
      );

      return room.maxGuests === people && room.availability && hasAvailability;
    });

    this._filteredRooms.set(filtered);
  }

  getRoomById(id: number): Room {
    return this._hotelRooms().find((room) => room.id === id);
  }
}
