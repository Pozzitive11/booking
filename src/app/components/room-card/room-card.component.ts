import { SearchService } from './../../services/search.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Room } from '../../models/room.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  protected searchService = inject(SearchService);
  protected bookingService = inject(BookingService);
  private router = inject(Router);
  room = input.required<Room>();

  errorMessage = signal<string | null>(null);

  rentRoom(): void {
    const url = this.router.createUrlTree(['/book-room', this.room().id], {
      queryParams: {
        checkInDate: this.searchService.selectedCheckInDate(),
        checkOutDate: this.searchService.selectedCheckOutDate(),
        amountOfPeople: this.searchService.amountOfPeople(),
        selectedDatesRangeCount: this.searchService.selectedDatesRangeCount(),
      },
    });

    // Відкриваємо нову вкладку
    window.open(url.toString(), '_blank');
  }
}
