import { reply } from 'alice-renderer';
import { YandexDatetime } from 'alice-types';
import { Component } from '../Component';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';
import { getDateRangeAbsolute } from './helpers';
import { months } from '../../utils/date';

export class AbsoluteDay extends Component {
  nextComponent = NextFilterOrEvent;

  day?: number;
  month?: number;

  match() {
    const entities = this.ctx.request.body.request.nlu?.entities || [];
    const { value } = entities.find(e => e.type === 'YANDEX.DATETIME' && e.value.day && !e.value.day_is_relative) as YandexDatetime || {};
    this.day = value?.day;
    this.month = value?.month;
    return Boolean(this.day && this.month);
  }

  async handle() {
    this.ctx.filter.data.dateRange = getDateRangeAbsolute(2021, this.month!, this.day!);
  }

  reply() {
    return reply`
      😍
      Обожаю людей, которые все планируют!
      Смотрю на ${this.day} ${months[this.month! - 1]}.
    `;
  }
}
