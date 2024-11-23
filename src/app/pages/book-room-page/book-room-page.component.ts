import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { RoomDetailsComponent } from '../../components/room-details/room-details.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../models/room.model';
@Component({
  selector: 'app-book-room-page',
  imports: [
    CommonModule,
    BookingFormComponent,
    RoomDetailsComponent,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './book-room-page.component.html',
  styleUrl: './book-room-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookRoomPageComponent {
  private bookingService = inject(BookingService);
  // protected searchService = inject(SearchService);
  roomId = input.required<number>();
  checkInDate = input.required<string>();
  checkOutDate = input.required<string>();
  amountOfPeople = input.required<number>();
  selectedDatesRangeCount = input.required<number>();

  bookingForm: FormGroup;
  room = computed<Room>(() => this.bookingService.getRoomById(+this.roomId()));

  onSubmit(form: FormGroup): void {
    console.log('Form submitted:', form.value);
    alert('Бронювання підтверджено!');
  }
}
