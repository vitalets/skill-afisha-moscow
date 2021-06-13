import { reply, buttons } from 'alice-renderer';
import { Component } from '../Component';
import { selectSphereScene } from '.';

export class Enter extends Component {
  nextScene = selectSphereScene;

  reply() {
    // исключить, что уже советовали
    // const shepres = this.ctx.filter.data.spheres;
    return reply`
      Могу посоветовать выставку, спектакль или мастер-класс.
      А также события в парках и для детей. Что вам сейчас интереснее? ❤️
      ${this.getButtons()}
    `;
  }

  getButtons() {
    return reply`
      ${buttons([ 'выставка', 'спектакль', 'мастер-класс', 'парк', 'для детей', 'не важно' ])}
    `;
  }
}

export class Continue extends Enter {
  reply() {
    return reply`
      Итак, что выбираете?
      ${this.getButtons()}
    `;
  }
}
