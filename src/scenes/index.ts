import { getSessions } from 'alice-renderer';
import { Runner } from '../../bot-components';
import { Ctx } from '../ctx';
import { defaultScene } from './Default';
import { alwaysScene } from './Always';

export async function runScenes(ctx: Ctx) {
  loadRendererState(ctx);
  ctx.runner = createRunner(ctx);
  await ctx.runner.run();
  updateSceneId(ctx);
  saveRendererState(ctx);
}

function createRunner(ctx: Ctx) {
  return new Runner({
    defaultScene,
    alwaysScene,
    createComponent: Component => new Component(ctx),
    sceneId: ctx.session.data.sceneId,
  });
}

function updateSceneId(ctx: Ctx) {
  const { newScene } = ctx.runner!;
  ctx.session.data.sceneId = newScene.id;
  if (newScene.getContinueComponent()) {
    ctx.session.data.prevSceneId = newScene.id;
  }
}

function loadRendererState(ctx: Ctx) {
  const sessions: Map<string, unknown> = getSessions();
  sessions.set(ctx.userId, ctx.request.sessionState);
}

function saveRendererState(ctx: Ctx) {
  const sessions: Map<string, unknown> = getSessions();
  ctx.response.sessionState = sessions.get(ctx.userId);
}
