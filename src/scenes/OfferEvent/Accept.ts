import { reply, buttons } from 'alice-renderer';
import { Component } from '../Component';
import { Scene } from '../../../bot-components';
import { Base } from './Base';
import { offerEventScene } from '.';

const regexp = [
  /пойду$/,
  /интересно$/,
  /подходит$/,
  /нравится/,
  /^можно$/,
];

export class Accept extends Component {
  nextScene = acceptEventScene;

  match() {
    return this.matchConfirm() || (this.matchRegexp(regexp) && !this.matchRegexp(/(^|\s)не /));
  }

  reply() {
    return reply`
      🎉
      ${this.getWow()}
      Уверена, вам понравится!
      Смотрим еще события?
      ${buttons([ 'да', 'нет' ])}
    `;
  }

  getWow() {
    return [
      'Рада, что смогла вам помочь!',
      'Рада, что мы попали в точку!',
      'Здорово, что мы нашли вам интересное мероприятие!',
      'Классно, что нашли вам что-то интересненькое!',
      'Здорово! Рада, что угадала ваши вкусы.',
      'Ура! Я угадала.',
    ];
  }
}

export class NoMoreEvents extends Component {
  nextScene = acceptEventStopScene;

  match() {
    return this.matchReject() || this.matchRegexp(/(^|\s)не /);
  }

  reply() {
    return reply.end`
      Хорошо 🙌
      ${buttons([ 'еще события' ])}
    `;
  }
}

export class MoreEvents extends Base {
  nextScene = offerEventScene;

  WOW = [];

  I_FOUND = [
    'Рада, что вы попросили! Рассказываю: ',
    'Спасибо, что спросили. Ловите: ',
    'Хорошо! Показываю ещё!',
    'Без проблем! Поехали!' ,
    'Отлично! У меня ещё куча мероприятий для вас!',
    'Уфф, да вас не остановить! Продолжаем!',
    'Да вы просто неумолимы! Ну ладно, продолжаем!',
    'Вызов принят! Смотрите сюда:',
    'Ну тогда держитесь! Поехали:' ,
    'Отлично! Полный вперёд!',
    'Супер! Мне нравится ваш настрой!',
    'Правильно, мероприятий мало не бывает! Смотрите сюда:',
    'Правильно, чем больше событий, тем лучше! Гоу!',
  ];
}

export const acceptEventScene: Scene = new Scene({
  id: 'accept-event',
  continue: null,
  loop: () => [
    NoMoreEvents,
    MoreEvents,
  ]
});

export const acceptEventStopScene: Scene = new Scene({
  id: 'accept-event-stop',
  continue: () => MoreEvents,
  loop: () => [
    MoreEvents,
  ]
});
