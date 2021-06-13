import { reply } from 'alice-renderer';
import { Ctx } from '../ctx';

export function handlePingRequest(ctx: Ctx) {
  if (ctx.request.userMessage === 'ping') {
    ctx.response.data = reply`pong`;
    return true;
  }
}
