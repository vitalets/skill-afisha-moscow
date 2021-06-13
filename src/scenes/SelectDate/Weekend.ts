import { reply } from 'alice-renderer';
import { Component } from '../Component';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';
import { findOffsetOfDayOfWeek, DayOfWeek, getDateRange } from './helpers';

export class Weekend extends Component {
  nextComponent = NextFilterOrEvent;

  match() {
    return this.matchRegexp(/выходн/);
  }

  async handle() {
    const saturdayOffset = findOffsetOfDayOfWeek(DayOfWeek.Saturday);
    this.ctx.filter.data.dateRange = getDateRange(saturdayOffset, saturdayOffset + 2);
  }

  reply() {
    return reply`
      ${REPLIES} 🛍
    `;
  }
}

const REPLIES = [
  'Отлично! Выходные только для отдыха и развлечений!',
  'О, кажется у кого-то намечаются отличные выходные!',
];
