import { reply, tts, buttons } from 'alice-renderer';
import { Component } from '../Component';
import { welcomeScene } from '.';
import { sounds } from '../assets';

export class Enter extends Component {
  nextScene = welcomeScene;

  // match() {
  //   return this.ctx.user.isNew;
  // }

  reply() {
    return reply`
      ${tts(sounds.tts.intro)}
      👋 Привет! Я Ваш персональный ассистент по поиску мероприятий в Москве.
      Задам пару вопросов и подберу для вас всё самое интересное!
      Начинаем? 🚀
      ${buttons([ 'Начинаем 👌' ])}
    `;
  }
}
