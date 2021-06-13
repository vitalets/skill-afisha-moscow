import { reply } from 'alice-renderer';
import { Component } from '../Component';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';
import { getDateRange } from './helpers';

const dayOffsetRegexp = {
  '2': /послезавтра/,
  '1': /завтра/, // важно, чтобы "завтра" проверялось после "послезавтра"
  '0': /сегодня/,
};

export class RelativeDay extends Component {
  nextComponent = NextFilterOrEvent;

  dayOffset!: number;

  match() {
    for (const [ dayOffset, regexp ] of Object.entries(dayOffsetRegexp)) {
      if (this.matchRegexp(regexp)) {
        this.dayOffset = Number(dayOffset);
        return true;
      }
    }
  }

  async handle() {
    this.ctx.filter.data.dateRange = getDateRange(this.dayOffset, this.dayOffset + 1);
  }

  reply() {
    return reply`
      💪
      ${dayOffsetReplies[this.dayOffset]}
    `;
  }
}

const dayOffsetReplies: Record<string, string> = {
  '2': '',
  '1': 'Хорошее дело нельзя откладывать!',
  '0': 'Правильно, действуем здесь и сейчас!',
};
