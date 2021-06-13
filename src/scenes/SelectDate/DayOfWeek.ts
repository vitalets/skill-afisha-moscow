import { reply } from 'alice-renderer';
import { Component } from '../Component';
import { getDateRange, DayOfWeek as DayOfWeekEnum, findOffsetOfDayOfWeek } from './helpers';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';

export class DayOfWeek extends Component {
  nextComponent = NextFilterOrEvent;

  dayOfWeek!: DayOfWeekEnum;
  dayOffset!: number;

  match() {
    for (const [ dayOfWeek, regexp ] of Object.entries(dayOfWeekRegexp)) {
      if (this.matchRegexp(regexp)) {
        this.dayOfWeek = Number(dayOfWeek);
        this.dayOffset = findOffsetOfDayOfWeek(this.dayOfWeek);
        // todo: dayOffset === 1 -> "это же уже завтра!"
        return true;
      }
    }
  }

  async handle() {
    this.ctx.filter.data.dateRange = getDateRange(this.dayOffset, this.dayOffset + 1);
  }

  reply() {
    return reply`
      ${WOW}
      ${dayOfWeekReplies[this.dayOfWeek]}
    `;
  }
}

const dayOfWeekRegexp = {
  [DayOfWeekEnum.Monday]: /понедельник/,
  [DayOfWeekEnum.Tuesday]: /вторник/,
  [DayOfWeekEnum.Wednesday]: /сред[ауы]/,
  [DayOfWeekEnum.Thursday]: /четверг/,
  [DayOfWeekEnum.Friday]: /пятниц/,
  [DayOfWeekEnum.Saturday]: /суббот/,
  [DayOfWeekEnum.Sunday]: /воскресень/,
};

const WOW = [
  'Хорошо!',
  'Да!',
  'О!',
  'Отличный выбор.'
];

const dayOfWeekReplies = {
  [DayOfWeekEnum.Monday]: 'Понедельник день тяжелый, а мы сделаем его легче!',
  [DayOfWeekEnum.Tuesday]: 'Сейчас посмотрю, что у нас по вторникам...',
  [DayOfWeekEnum.Wednesday]: 'Середина недели - самое время отдохнуть!',
  [DayOfWeekEnum.Thursday]: 'Четверг уже давно не рыбный день, а музейный!',
  [DayOfWeekEnum.Friday]: 'Спасибо Боже, что создал пятницу.',
  [DayOfWeekEnum.Saturday]: 'Кажется у кого-то намечаются отличные выходные!',
  [DayOfWeekEnum.Sunday]: 'По воскресеньям столько всего происходит!',
};
