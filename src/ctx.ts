/**
 * Context - main object storing request related data and services.
 */
import { Runner } from '../bot-components';
import { Request, Response, initRequest, initResponse } from './protocol';
import { Logger } from './logger';
import { User, Session, Filter } from './state';

export class Ctx {
  requestId: string;
  request: Request;
  userId: string;
  logger: Logger;
  response: Response;

  user!: User;
  session!: Session;
  filter!: Filter;

  runner?: Runner;

  constructor(requestId: string, reqBody: unknown) {
    this.requestId = requestId;
    this.request = initRequest(reqBody);
    this.userId = this.request.userId;
    this.logger = new Logger(this);
    this.response = initResponse(this.request);
  }
}
