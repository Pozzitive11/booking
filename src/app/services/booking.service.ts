import { computed, inject, Injectable, signal } from '@angular/core';
import { Room, UserRoom } from '../models/room.model';
import { RoomsFirebaseService } from './rooms-firebase.service';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private roomsFirebaseService = inject(RoomsFirebaseService);
  private authService = inject(AuthService);

  private _hotelRooms = signal<Room[]>([]);
  private _filteredRooms = signal<Room[]>([]);
  private _userBookedRooms = signal<UserRoom[]>([]);

  hotelRooms = computed(() => this._hotelRooms());
  filteredRooms = computed(() => this._filteredRooms());
  userBookedRooms = computed(() => this._userBookedRooms());

  getRooms() {
    this.roomsFirebaseService.getRooms().subscribe((rooms) => {
      this._hotelRooms.set(rooms);
      this._filteredRooms.set(rooms);
    });
  }

  getUserBookedRooms() {
    this.roomsFirebaseService
      .getRoomsByUserId()
      .pipe(
        map((rooms) =>
          rooms.filter(
            (room) => room.userId === this.authService.currentUser()?.id
          )
        )
      )
      .subscribe((filteredRooms) => {
        this._userBookedRooms.set(filteredRooms);
      });
  }
  filterRooms(selectedDates: string[], people: number): void {
    const filtered = this._hotelRooms().filter((room) => {
      const hasConflict = selectedDates.some((date) =>
        room.bookedDates.includes(date)
      );

      return room.maxGuests >= people && !hasConflict;
    });

    this._filteredRooms.set(filtered);
  }

  setBookedDates(roomId: string, selectedDates: string[]): void {
    this._filteredRooms.set(
      this._filteredRooms().map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            bookedDates: [...room.bookedDates, ...selectedDates],
          };
        }

        return room;
      })
    );
  }

  getRoomById(id: string): Room {
    return this._filteredRooms().find((room) => room.id === id);
  }
}
