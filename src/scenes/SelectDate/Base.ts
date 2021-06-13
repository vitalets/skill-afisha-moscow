import { reply, buttons } from 'alice-renderer';
import { Component } from '../Component';
import { getCurrentDayOfWeek, DayOfWeek, getCurrentDate } from './helpers';

export class Base extends Component {
  isEvening() {
    const date = getCurrentDate();
    return date.getUTCHours() >= 19;
  }

  getSuggest() {
    return reply`
      ${this.getMessage()}? 📆
      ${this.getButtons()}
    `;
  }

  getMessage() {
    return this.isEvening()
      ? `Завтра, ${this.getWeekendMessage()} или конкретный день`
      : `Сегодня, завтра или ${this.getWeekendMessage()}`;
  }

  getWeekendMessage() {
    const currentDayOfWeek = getCurrentDayOfWeek();
    switch (currentDayOfWeek) {
      case DayOfWeek.Sunday: return 'следующие выходные';
      case DayOfWeek.Saturday: return 'все выходные';
      default: return 'ближайшие выходные';
    }
  }

  getButtons() {
    return this.isEvening()
      ? buttons([ 'завтра', 'выходные'])
      : buttons([ 'сегодня', 'завтра', 'выходные']);
  }
}
