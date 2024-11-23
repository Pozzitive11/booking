import { computed, inject, Injectable, signal } from '@angular/core';
import { Room } from '../models/room.model';
import { RoomsFirebaseService } from './rooms-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private roomsFirebaseService = inject(RoomsFirebaseService);

  private _hotelRooms = signal<Room[]>([]);
  private _filteredRooms = signal<Room[]>([]);

  hotelRooms = computed(() => this._hotelRooms());
  filteredRooms = computed(() => this._filteredRooms());

  getRooms() {
    this.roomsFirebaseService.getRooms().subscribe((rooms) => {
      this._hotelRooms.set(rooms);
      this._filteredRooms.set(rooms);
    });
  }

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
