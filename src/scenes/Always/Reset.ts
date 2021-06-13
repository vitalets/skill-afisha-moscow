import { Component } from '../Component';
import { Enter as EnterWelcome } from '../Welcome/Enter';

export class Reset extends Component {
  nextComponent = EnterWelcome;

  match() {
    return this.matchRegexp([
      /все сначала/,
      /(начать|давай) (все )?(сначала|заново)/
    ]);
  }

  reply() {
    this.ctx.session.init();
    this.ctx.filter.init();
    this.ctx.user.data.offeredEvents = [];
  }
}
