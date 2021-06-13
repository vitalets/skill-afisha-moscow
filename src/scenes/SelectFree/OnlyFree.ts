import { reply } from 'alice-renderer';
import { Component } from '../Component';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';

export class OnlyFree extends Component {
  nextComponent = NextFilterOrEvent;

  match() {
    return this.matchRegexp([
      /бесплатн/,
      /халяв[ау]/,
    ]);
  }

  async handle() {
    this.ctx.filter.data.free = true;
  }

  reply() {
    return reply`
      ${this.getMsg()}
    `;
  }

  getMsg() {
    return [
      'Ну и правильно! Можно будет купить мороженное! 🍦',
      'Отлично! Вам же больше достанется!',
      'Поддерживаю! Я тоже люблю халяву ☺️',
      'Здорово! Мне нравится такой подход! ☺️',
    ];
  }
}
