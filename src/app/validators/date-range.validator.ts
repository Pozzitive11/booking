import { AbstractControl, ValidationErrors } from '@angular/forms';
import { addDays, isAfter, isBefore } from 'date-fns';

export function dateRangeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value) return null; // Якщо значення немає, валідація не потрібна

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Обнуляємо час для поточної дати
  const maxDate = addDays(today, 30); // Обчислюємо максимальну дату

  const selectedDate = new Date(value);
  selectedDate.setHours(0, 0, 0, 0); // Обнуляємо час для вибраної дати

  // Перевіряємо, чи вибрана дата не раніше сьогоднішнього дня і не пізніше максимального
  if (isBefore(selectedDate, today) || isAfter(selectedDate, maxDate)) {
    return { dateRange: true }; // Помилка валідації
  }

  return null; // Якщо все добре, повертаємо `null`
}
