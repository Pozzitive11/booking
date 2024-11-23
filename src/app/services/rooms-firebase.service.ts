import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsFirebaseService {
  firestore = inject(Firestore);

  roomsCollection = collection(this.firestore, 'hotelRooms');
  getRooms(): Observable<Room[]> {
    return collectionData(this.roomsCollection, { idField: 'id' });
  }

  bookRoom(roomId: number, selectedDates: string[]): Observable<void> {
    const docRef = doc(this.firestore, 'hotelRooms/', roomId.toString());
    const promise = updateDoc(docRef, {
      availableDates: selectedDates,
      availability: false,
    });
    return from(promise);
  }
}
