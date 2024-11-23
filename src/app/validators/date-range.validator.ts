import { AbstractControl, ValidationErrors } from '@angular/forms';
import { addDays, isBefore } from 'date-fns';

export function dateRangeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Обнуляємо час
  const maxDate = addDays(today, 30); // Максимальна дата

  const selectedDate = new Date(value);
  selectedDate.setHours(0, 0, 0, 0); // Обнуляємо час для вибраної дати

  if (isBefore(selectedDate, today) || isBefore(maxDate, selectedDate)) {
    return { dateRange: true }; // Помилка, якщо дата поза діапазоном
  }

  return null; // Валідний стан
}
