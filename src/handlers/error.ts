import { reply } from 'alice-renderer';
import { Ctx } from '../ctx';

export function handleError(ctx: Ctx, e: Error) {
  ctx.logger.logError(e);
  ctx.response.data = ctx.response.data || buildErrorResponse();
}

function buildErrorResponse() {
  return reply`
    Ошибка на сервере :(
    Побежала будить разаботчика!
  `;
}
