import { Ctx } from './ctx';
import { ServerlessEvent, ServerlessContext, getRequestBody, buildResponse } from './utils/serverless';
import { loadState, saveState } from './state';
import { runScenes } from './scenes';
import { handlePingRequest } from './handlers/ping';
import { handleError } from './handlers/error';

export async function handler(event: ServerlessEvent, { requestId }: ServerlessContext) {
  const reqBody = getRequestBody(event);
  const ctx = new Ctx(requestId, reqBody);
  await handleRequest(ctx);
  return buildResponse(event, ctx.response.body);
}

async function handleRequest(ctx: Ctx) {
  ctx.logger.logRequestForDebug();
  handlePingRequest(ctx) || (await handleUserRequest(ctx));
  ctx.logger.logResponseForDebug();
}

async function handleUserRequest(ctx: Ctx) {
  try {
    loadState(ctx);
    await runScenes(ctx);
    saveState(ctx);
  } catch (e) {
    ctx.logger.logRequestResponse();
    handleError(ctx, e);
    return;
  }
  ctx.logger.logRequestResponse();
}
