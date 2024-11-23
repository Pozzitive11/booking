import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { RoomCardsListComponent } from '../../components/room-cards-list/room-cards-list.component';

@Component({
  selector: 'app-main-page',
  imports: [SearchComponent, RoomCardsListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
