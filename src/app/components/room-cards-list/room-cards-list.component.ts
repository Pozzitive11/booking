import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-room-cards-list',
  imports: [CommonModule, RoomCardComponent],
  templateUrl: './room-cards-list.component.html',
  styleUrl: './room-cards-list.component.css',
  standalone: true,
})
export class RoomCardsListComponent {
  protected bookingService = inject(BookingService);
}
