import { DayOfWeek } from '../../src/scenes/SelectDate/helpers';

// sunday in msk
const baseDate = new Date('2021-06-06T00:00:00+03:00');

export { DayOfWeek };

export function mockDate(dayOfWeek: DayOfWeek, hours = 0) {
  const date = new Date(baseDate);
  date.setHours(hours);
  date.setDate(date.getDate() + dayOfWeek);
  sinon.useFakeTimers(date);
  return date;
}

export function getMskDate(daysOffset: number) {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + 3);
  date.setUTCDate(date.getUTCDate() + daysOffset);
  return date;
}
