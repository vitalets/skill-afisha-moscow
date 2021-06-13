import { DateRange } from '../../state/filter';

// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay
export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/**
 * Возвращает текущую дату в Москве с обнуленными минутами.
 * Везде используем UTC* методы, чтобы не зависеть от времени сервера.
 */
export function getCurrentDate() {
  const date = new Date();
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
  date.setUTCHours(date.getUTCHours() + 3);
  return date;
}

export function getCurrentDayOfWeek() {
  return getCurrentDate().getUTCDay() as DayOfWeek;
}

export function addDays(date: Date, days: number) {
  return new Date(date).setUTCDate(date.getUTCDate() + days);
}

export function findOffsetOfDayOfWeek(target: DayOfWeek) {
  const currentDayOfWeek = getCurrentDayOfWeek();
  for (let i = 0; i <= 6; i++) {
    const dayOfWeek = (currentDayOfWeek + i) % 7;
    if (dayOfWeek === target) {
      return i;
    }
  }

  throw new Error(`Invalid day of week: ${target}`);
}

export function getDateRange(daysOffsetFrom: number, daysOffsetTo: number) {
  const date = getCurrentDate();
  return {
    dateFrom: addDays(date, daysOffsetFrom),
    dateTo: addDays(date, daysOffsetTo),
  } as DateRange;
}

export function getDateRangeAbsolute(year: number, month: number, day: number) {
  const date = new Date(`${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T00:00:00Z`);
  return {
    dateFrom: date.valueOf(),
    dateTo: addDays(date, 1),
  } as DateRange;
}

function addLeadingZero(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}
