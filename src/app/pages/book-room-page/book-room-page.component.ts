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
import { RoomsFirebaseService } from '../../services/rooms-firebase.service';
import { SearchService } from '../../services/search.service';
import { UtilsFunctions } from '../../utils/utils.functions';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-book-room-page',
  imports: [
    CommonModule,
    BookingFormComponent,
    RoomDetailsComponent,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './book-room-page.component.html',
  styleUrl: './book-room-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookRoomPageComponent implements OnInit {
  private bookingService = inject(BookingService);
  private roomsFirebaseService = inject(RoomsFirebaseService);
  private searchService = inject(SearchService);
  roomId = input.required<string>();
  checkInDate = input.required<string>();
  checkOutDate = input.required<string>();
  amountOfPeople = input.required<number>();
  selectedDatesRangeCount = input.required<number>();
  private dialog = inject(MatDialog);
  bookingForm: FormGroup;
  room = computed<Room>(() => this.bookingService.getRoomById(this.roomId()));

  ngOnInit(): void {
    this.searchService.updateSelectedDates(
      UtilsFunctions.convertStringToDate(this.checkInDate()),
      UtilsFunctions.convertStringToDate(this.checkOutDate())
    );
  }

  onSubmit(form: FormGroup): void {
    this.bookingService.setBookedDates(
      this.roomId(),
      this.searchService.selectedDatesRange()
    );
    this.roomsFirebaseService
      .bookRoom(this.roomId(), this.searchService.selectedDatesRange())
      .subscribe(() => {
        this.openDialog();
        this.searchService.clearSelectedDates();
      });
  }

  openDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
