import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-room-cards-list',
  imports: [CommonModule, RoomCardComponent],
  templateUrl: './room-cards-list.component.html',
  styleUrl: './room-cards-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardsListComponent {
  protected bookingService = inject(BookingService);
}
