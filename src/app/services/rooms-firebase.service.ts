import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { forkJoin, from, map, Observable } from 'rxjs';
import { Room, UserRoom } from '../models/room.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoomsFirebaseService {
  authService = inject(AuthService);
  firestore = inject(Firestore);

  roomsCollection = collection(this.firestore, 'hotelRooms');
  bookedRoomsCollection = collection(this.firestore, 'bookedRooms');
  getRooms(): Observable<Room[]> {
    return collectionData(this.roomsCollection, { idField: 'id' });
  }

  bookRoom(roomId: number, selectedDates: string[]): Observable<[void, void]> {
    const currentUser = this.authService.currentUser();

    // Посилання на колекцію bookedRooms
    const bookedRoomsCollection = collection(this.firestore, 'bookedRooms');

    // Оновлюємо інформацію про доступні дати у номері
    const updateRoom$ = from(
      updateDoc(doc(this.firestore, 'hotelRooms', roomId.toString()), {
        availableDates: selectedDates,
        availability: selectedDates.length === 0, // Якщо дати відсутні, то номер недоступний
      })
    );

    // Додаємо новий запис у колекцію bookedRooms
    const setUserBooking$ = from(
      addDoc(bookedRoomsCollection, {
        roomId,
        selectedDates,
        userId: currentUser.id,
      })
    );
    return forkJoin([updateRoom$, setUserBooking$]).pipe(map(() => void 0));
  }

  getRoomsByUserId(): Observable<UserRoom[]> {
    return collectionData(this.bookedRoomsCollection, { idField: 'id' });
  }
}
