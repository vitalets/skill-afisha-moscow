import { reply, buttons } from 'alice-renderer';
import { Component } from '../../Component';

export class AddToCalendar extends Component {
  match() {
    return this.isIos() && this.matchRegexp(/календар/);
  }

  reply() {
    return reply`
      На айфонах пока не умею добавлять в календарь, но обязательно научусь 🤓
      ${buttons(this.getSuggestButtons())}
    `;
  }

  getSuggestButtons() {
    return [
      'ещё события 🎉',
      'спасибо 🙏',
    ];
  }
}

