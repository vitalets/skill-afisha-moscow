import { reply } from 'alice-renderer';
import { Component } from '../Component';

export class Help extends Component {
  match() {
    return this.matchIntent('YANDEX.HELP') || this.matchIntent('YANDEX.WHAT_CAN_YOU_DO');
  }

  reply() {
    return reply`
      ℹ️
      Я могу подобрать для Вас интересные мероприятия в Москве!
      Только укажите день, и дальше я буду предлагать варианты.
    `;
  }
}
