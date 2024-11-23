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
  dates = computed(() => {
    return {
      checkInDate: UtilsFunctions.formatDateToUkrainian(
        this.searchService.selectedDates()[0]
      ),
      checkOutDate: UtilsFunctions.formatDateToUkrainian(
        this.searchService.selectedDates()[
          this.searchService.selectedDates().length - 1
        ]
      ),
    };
  });

  daysCount = input.required<number>();
}
