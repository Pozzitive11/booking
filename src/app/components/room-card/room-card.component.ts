import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Room } from '../../models/room.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BookRoomComponent } from '../book-room/book-room.component';
@Component({
  selector: 'app-room-card',
  imports: [CommonModule, MatIconModule, MatButtonModule, BookRoomComponent],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: true,
})
export class RoomCardComponent {
  private router = inject(Router);
  @Input() room: Room;
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(BookRoomComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
