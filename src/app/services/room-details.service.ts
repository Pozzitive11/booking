import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomDetailsService {
  getRatingDescription(rating: number): string {
    if (rating >= 4.5) {
      return 'Відмінно';
    } else if (rating >= 4.0) {
      return 'Дуже добре';
    } else if (rating >= 3.0) {
      return 'Добре';
    } else if (rating >= 2.0) {
      return 'Задовільно';
    } else if (rating >= 1.0) {
      return 'Погано';
    } else {
      return 'Немає оцінки';
    }
  }
}
