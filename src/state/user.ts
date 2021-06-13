/**
 * User state
 */
import { Ctx } from '../ctx';
import { SessionData } from './session';
import { FilterData } from './filter';

export class UserData {
  lastMessageTime = 0;
  sessions = 0;
  offeredEvents: number[] = [];
  session?: SessionData;
  filter?: FilterData;
}

export class User {
  data: UserData;

  constructor(private ctx: Ctx, data: unknown) {
    this.data = Object.assign(new UserData(), data);
  }

  get isNew() {
    return this.ctx.session.isNew && this.data.sessions === 1;
  }

  incrementSessions() {
    this.data.sessions++;
  }

  updateLastMessageTime() {
    this.data.lastMessageTime = Date.now();
  }

  saveOfferedEvent(eventId: number) {
    const MAX_STORED_EVENTS = 10;
    this.data.offeredEvents.unshift(eventId);
    this.data.offeredEvents = this.data.offeredEvents.slice(0, MAX_STORED_EVENTS);
  }
}
