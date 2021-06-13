import { reply, buttons } from 'alice-renderer';
import { Scene } from '../../../bot-components';
import { Component } from '../Component';
import { ReturnToPrevScene } from '../Utils/ReturnToPrevScene';

export class Exit extends Component {
  nextScene = exitingScene;

  match() {
    return this.matchRegexp([
      /^(как )?выйти$/,
      /^хватит/,
      /^закончи(м|ть)$/,
    ]);
  }

  reply() {
    return reply`
      Закончить подбор мероприятий?
      ${buttons([ 'да', 'нет' ])}
    `;
  }
}

class Confirm extends Component {
  match() {
    return this.matchConfirm();
  }

  reply() {
    return reply.end`
      До новых встреч!
    `;
  }
}

class Cancel extends Component {
  reply() {
    this.nextComponent = ReturnToPrevScene;
    return reply`
      Тогда продолжаем.
    `;
  }
}

const exitingScene: Scene = new Scene({
  id: 'exiting',
  continue: null,
  loop: () => [
    Confirm,
    Cancel,
  ]
});
