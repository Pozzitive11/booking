import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
}
