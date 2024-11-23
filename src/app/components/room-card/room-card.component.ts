import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: true,
})
export class RoomCardComponent {
  @Input() room: any;
}
