import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Room } from '../../models/room.model';
import { BookingService } from '../../services/booking.service';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { RoomDetailsComponent } from '../../components/room-details/room-details.component';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-book-room-page',
  imports: [CommonModule, BookingFormComponent, RoomDetailsComponent],
  templateUrl: './book-room-page.component.html',
  styleUrl: './book-room-page.component.css',
  standalone: true,
})
export class BookRoomPageComponent {
  private bookingService = inject(BookingService);
  protected searchService = inject(SearchService);
  roomId = input.required<number>();
  bookingForm: FormGroup;
  room = computed<Room>(() => this.bookingService.getRoomById(+this.roomId()));

  onSubmit(form: FormGroup): void {
    console.log('Form submitted:', form.value);
    alert('Бронювання підтверджено!');
  }
}
