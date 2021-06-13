import { reply, buttons } from 'alice-renderer';
import { Component } from '../Component';
import { selectFreeScene } from '.';

export class Enter extends Component {
  nextScene = selectFreeScene;

  reply() {
    return reply`
      ${this.getMsg()}
      ${this.getSuggest()}
    `;
  }

  getMsg() {
    return [
      'Могу поискать по всем событиям или только по бесплатным! Вам какие подать?',
      'Есть разные события: платные, бесплатные. Вам какие?'
    ];
  }

  getSuggest() {
    return reply`
      ${buttons([ 'бесплатные', 'любые' ])}
    `;
  }
}

export class Continue extends Enter {
  reply() {
    return reply`
      Ну что, смотрю только бесплатные события или за денежку тоже?
      ${this.getSuggest()}
    `;
  }
}
