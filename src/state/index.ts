import { Ctx } from '../ctx';
import { User } from './user';
import { Session } from './session';
import { Filter } from './filter';

export { User, Session, Filter };

export function loadState(ctx: Ctx) {
  const data = ctx.request.state || {};
  ctx.logger.debug(`LOAD_STATE: ${JSON.stringify(data)}`);
  ctx.user = new User(ctx, data);
  ctx.session = new Session(ctx);
  ctx.filter = new Filter(ctx);
}

export function saveState(ctx: Ctx) {
  ctx.user.updateLastMessageTime();
  ctx.logger.debug(`SAVE_STATE: ${JSON.stringify(ctx.user.data)}`);
  ctx.response.state = ctx.user.data;
}

