import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RoomDetailsService } from '../../services/room-details.service';
import { SearchService } from '../../services/search.service';
import { UtilsFunctions } from '../../utils/utils.functions';
import { Room } from '../../models/room.model';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-room-details',
  imports: [MatIcon, CommonModule, CustomDatePipe],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailsComponent {
  protected roomDetailsService = inject(RoomDetailsService);
  protected searchService = inject(SearchService);

  room = input.required<Room>();
  daysCount = input.required<number>();
  checkInDate = input.required<string>();
  checkOutDate = input.required<string>();
  amountOfPeople = input.required<number>();

  totalPrice = computed(() => this.room().pricePerNight * this.daysCount());

  formattedPeopleWord = computed(() => {
    return UtilsFunctions.formatPeopleWord(+this.amountOfPeople());
  });
}
