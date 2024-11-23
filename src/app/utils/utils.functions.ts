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

  static formatDateToUkrainian(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('uk-UA', {
      weekday: 'short', // скорочений день тижня (вт, ср, пт)
      day: '2-digit', // двозначний день (01, 26)
      month: 'short', // скорочений місяць (лист., гру.)
      year: 'numeric', // рік
    });

    return formatter.format(date); // Форматуємо дату
  }

  static formatPeopleWord(amountOfPeople: number): string {
    if (amountOfPeople === 1) {
      return 'людини';
    } else {
      return 'людей';
    }
  }

  static convertStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // У JavaScript місяці починаються з 0 (січень = 0)
  }
}
