import { reply, buttons, text, pause } from 'alice-renderer';
import { Scene } from '../../../../bot-components';
import { Component } from '../../Component';
import { MoreEvents } from './MoreEvents';

export class NoMoreEvents extends Component {
  nextScene = eventDetailsStopScene;

  match() {
    return this.matchReject() || this.matchRegexp(/(^|\s)не /) || this.matchRegexp(/спасибо/);
  }

  reply() {
    return reply.end`
      ${this.getMsg()}
      Потом обязательно поделитесь со мной впечатлениями!
      Пока! 😘
      ${this.getButtons()}
    `;
  }

  getMsg() {
    return [
      'Рада, что смогла вам помочь!',
      'Здорово, что мы нашли вам интересное мероприятие!',
      'Классно, что нашли вам что-то интересненькое!',
      'Здорово! Рада, что угадала ваши вкусы.',
    ];
  }

  getButtons() {
    return buttons([ 'еще события' ]);
  }
}

export class SilentSmile extends Component {
  reply() {
    return reply.end`
      ${text('😇', '')}
      ${pause()}
      ${buttons([ 'еще события' ])}
    `;
  }
}

export const eventDetailsStopScene: Scene = new Scene({
  id: 'event-details-stop',
  continue: () => MoreEvents,
  loop: () => [
    MoreEvents,
    SilentSmile,
  ]
});
