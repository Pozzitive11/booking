import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-user-booking-page',
  imports: [CommonModule, MatIcon, CustomDatePipe],
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
