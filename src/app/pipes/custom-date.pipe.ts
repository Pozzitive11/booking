import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
  pure: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return '';

    // Перетворюємо в об'єкт дати
    const date = new Date(value);

    // Список днів та місяців українською мовою
    const days = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const months = [
      'січ.',
      'лют.',
      'берез.',
      'квіт.',
      'трав.',
      'черв.',
      'лип.',
      'серп.',
      'верес.',
      'жовт.',
      'лист.',
      'груд.',
    ];

    // Форматування
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Результат у форматі: "пт, 29 лист. 2024 р."
    return `${dayOfWeek}, ${day} ${month} ${year} р.`;
  }
}
