import { reply, tts } from 'alice-renderer';
import { Component } from '../Component';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';
import { sounds } from '../assets';

export class All extends Component {
  nextComponent = NextFilterOrEvent;

  match() {
    return this.matchRegexp([
      /любые/,
      /все события/,
    ]);
  }

  async handle() {
    this.ctx.filter.data.free = false;
  }

  reply() {
    // todo: dynamically select next filter
    return reply`
      ${this.getMsg()}${tts(sounds.tts.money)} 💰
    `;
  }

  getMsg() {
    return [
      'Согласна! Скупой платит дважды.',
      'Отлично! Давайте потратим все ваши деньги!',
      'А вы у нас богатенький буратино!',
      'Ура! Гуляяем!!',
    ];
  }
}
