import { Component, computed, inject, input } from '@angular/core';
import { Room } from '../../models/room.model';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RoomDetailsService } from '../../services/room-details.service';
import { SearchService } from '../../services/search.service';
import { UtilsFunctions } from '../../utils/utils.functions';

@Component({
  selector: 'app-room-details',
  imports: [MatIcon, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
  standalone: true,
})
export class RoomDetailsComponent {
  protected roomDetailsService = inject(RoomDetailsService);
  protected searchService = inject(SearchService);

  room = input.required<Room>();
  daysCount = input.required<number>();
  checkInDate = input.required<string>();
  checkOutDate = input.required<string>();
  amountOfPeople = input.required<number>();

  formattedCheckInDate = computed(() => {
    return UtilsFunctions.formatDateToUkrainian(this.checkInDate());
  });

  formattedCheckOutDate = computed(() => {
    return UtilsFunctions.formatDateToUkrainian(this.checkOutDate());
  });

  totalPrice = computed(() => this.room().pricePerNight * this.daysCount());
}
