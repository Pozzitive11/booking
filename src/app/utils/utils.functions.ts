export class UtilsFunctions {
  static toLocalISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  /**
   * Генерує масив дат між двома заданими датами (включно)
   */
  static getDatesInRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(
        this.toLocalISODate(new Date(currentDate)) // Перетворюємо в локальний формат ISO
      );
      currentDate.setDate(currentDate.getDate() + 1); // Переходимо до наступного дня
    }

    return dates;
  }
}
