import { CommonModule } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Room } from '../../models/room.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: true,
})
export class RoomCardComponent {
  private router = inject(Router);
  room = input.required<Room>();

  rentRoom(): void {
    this.router.navigate(['/book-room', this.room().id]);
  }
}
