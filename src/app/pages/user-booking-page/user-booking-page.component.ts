import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-user-booking-page',
  imports: [],
  templateUrl: './user-booking-page.component.html',
  styleUrl: './user-booking-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBookingPageComponent implements OnInit {
  bookingService = inject(BookingService);

  ngOnInit(): void {
    this.bookingService.getUserBookedRooms();
  }
}
