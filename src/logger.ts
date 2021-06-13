/**
 * Logger
 */
import { createLogger, Logger as ConsoleLogger } from './utils/create-logger';
import { Ctx } from './ctx';
import { shorten } from './utils';

const MAX_BOT_MESSAGE_LENGTH = 80;
const CUT_BOT_MESSAGE = process.env.NODE_ENV === 'production';

export class Logger {
  logger: ConsoleLogger;

  constructor(private ctx: Ctx) {
    const prefix = this.buildPrefix();
    this.logger = createLogger(prefix);
  }

  logRequestResponse() {
    this.logRequest();
    this.logResponse();
  }

  logRequest() {
    const userMessage = this.buildUserMessage();
    const componentsMessage = this.buildComponentsMessage();
    const newSessionMessage = this.buildNewSessionMessage();
    this.logger.log(`U: "${userMessage}" ${componentsMessage}${newSessionMessage}`);
  }

  logResponse() {
    const botMessage = this.buildBotMessage();
    this.logger.log(`A: "${botMessage}"`);
  }

  logError(e: Error) {
    this.logger.error(e.stack || e.message);
  }

  logRequestForDebug() {
    this.logger.debug(`========`);
    this.logger.debug(`REQUEST: ${JSON.stringify(this.ctx.request.body)}`);
  }

  logResponseForDebug() {
    this.logger.debug(`RESPONSE: ${JSON.stringify(this.ctx.response.body)}`);
  }

  debug(...args: unknown[]) {
    this.logger.debug(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn('WARN', ...args);
  }

  private buildPrefix() {
    return `[${this.ctx.userId.slice(0, 6)}-${this.ctx.requestId.slice(0, 8)}]`;
  }

  private buildUserMessage() {
    return this.ctx.request.userMessage;
    // todo: support buttons
    // const { request } = this.ctx.reqBody;
    // const isButtonPressed = request.type === 'ButtonPressed';
    // // при нажатии на кнопку с payload приходит только payload, без command
    // return isButtonPressed
    //   ? `button ${JSON.stringify(request.payload).replace(/"/g, '\'')}`
    //   : request.command;
  }

  private buildNewSessionMessage() {
    if (this.ctx.session.isNew) {
      return ` {new session: ${this.ctx.user.data.sessions}}`;
    } else {
      return '';
    }
  }

  private buildBotMessage() {
    // меняем перенос строк на пробел, чтобы в логах было удобнее смотреть
    const botMessage = this.ctx.response.text.replace(/\n/g, ' ');
    return CUT_BOT_MESSAGE ? shorten(botMessage, MAX_BOT_MESSAGE_LENGTH) : botMessage;
  }

  private buildComponentsMessage() {
    if (!this.ctx.runner) {
      return;
    }
    const { oldScene, matchedComponents } = this.ctx.runner;
    const componentNames = matchedComponents.map((component, index) => [
      component.nextScene?.id || (index === 0 ? oldScene.id : ''),
      component.constructor.name,
    ].filter(Boolean).join('.'));
    const chain = [ oldScene.id, ...componentNames ].join(' -> ');
    const [ firstComponent ] = matchedComponents;
    const noMatch = firstComponent && firstComponent.matchedAsDefault ? '[no_match]' : '';
    return `(${chain})${noMatch}`;
  }

}
