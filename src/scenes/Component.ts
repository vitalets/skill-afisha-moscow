import { ResBody } from 'alice-types';
import { reply, userify } from 'alice-renderer';
import { Component as BotComponent } from '../../bot-components';
import { Ctx } from '../ctx';
import { sounds } from './assets';

export class Component extends BotComponent {
  sounds = sounds;

  constructor(public ctx: Ctx) {
    super();
    this.wrapReply();
  }

  get userMessage() {
    return this.ctx.request.userMessage;
  }

  matchRegexp(regexp: RegExp | RegExp[]) {
    regexp = Array.isArray(regexp) ? regexp : [ regexp ];
    return regexp.some(regexp => regexp.test(this.userMessage));
  }

  matchIntent(intent: string) {
    if (this.ctx.request.isAlice) {
      // todo: move to protocol/alice?
      return Boolean(this.ctx.request.body.request.nlu?.intents?.[intent]);
    }
  }

  matchConfirm() {
    return this.matchIntent('YANDEX.CONFIRM');
  }

  matchReject() {
    return this.matchIntent('YANDEX.REJECT');
  }

  isIos() {
    return /apple|iphone/i.test(this.ctx.request.body.meta.client_id);
  }

  private wrapReply() {
    const origReply = this.reply;
    this.reply = userify(this.ctx.userId, () => {
      const response = origReply.call(this) as unknown as ResBody['response'] | void;
      this.ctx.response.data = reply`${this.ctx.response.data || ''} ${response || ''}`;
    });
  }
}
