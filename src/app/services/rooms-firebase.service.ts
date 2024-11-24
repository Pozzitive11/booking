import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { forkJoin, from, map, Observable, switchMap, take } from 'rxjs';
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

  bookRoom(roomId: string, selectedDates: string[]): Observable<[void, void]> {
    const currentUser = this.authService.currentUser();

    const updateRoom$ = from(
      updateDoc(doc(this.firestore, 'hotelRooms', roomId.toString()), {
        bookedDates: arrayUnion(...selectedDates),
      })
    );

    const roomDocRef = doc(this.firestore, 'hotelRooms', roomId);
    const roomData$ = docData(roomDocRef).pipe(
      take(1),
      map((data) => {
        if (typeof data !== 'object' || data === null) {
          throw new Error('roomData is not a valid object');
        }

        return {
          ...data,
          bookedDates: selectedDates,
        };
      })
    );

    const addBooking$ = roomData$.pipe(
      switchMap((roomData) => {
        const bookedRoomDocRef = doc(
          this.firestore,
          'bookedRooms',
          this.authService.currentUser().id
        );
        return updateDoc(bookedRoomDocRef, {
          roomId,
          rooms: arrayUnion({
            roomData,
          }),
          userId: currentUser.id,
        });
      })
    );
    return forkJoin([updateRoom$, addBooking$]).pipe(map(() => void 0));
  }

  getRoomsByUserId(): Observable<UserRoom[]> {
    return collectionData(this.bookedRoomsCollection, { idField: 'id' });
  }
}
