import { Ctx } from '../ctx';

// время от последнего сообщения, через которое считаем, что это новая сессия пользователя, старую очищаем (3 часа)
const SESSION_TIMEOUT = 1 * 60 * 60 * 1000;

export class SessionData {
  startTime = Date.now();
  sceneId = '';
  prevSceneId = '';
}

export class Session {
  isNew: boolean;

  constructor(private ctx: Ctx) {
    this.data = Object.assign(new SessionData(), this.data);
    this.isNew = this.getIsNew();
    if (this.isNew) {
      this.init();
      this.ctx.user.incrementSessions();
    }
  }

  get data() {
    return this.ctx.user.data.session!;
  }

  set data(value: SessionData) {
    this.ctx.user.data.session = value;
  }

  init() {
    this.data = new SessionData();
  }

  private getIsNew() {
    const { lastMessageTime } = this.ctx.user.data;
    return !lastMessageTime || (Date.now() - lastMessageTime > SESSION_TIMEOUT);
  }
}
