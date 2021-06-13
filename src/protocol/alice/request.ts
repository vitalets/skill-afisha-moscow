/**
 * Alice request.
 */
import { ReqBody } from 'alice-types';

export class AliceRequest {
  static match(reqBody: unknown): reqBody is ReqBody {
    return Boolean((reqBody as ReqBody)?.request);
  }

  isAlice = true;

  constructor(public body: ReqBody) { }

  get userId() {
    return this.body.session.application.application_id;
  }

  get userMessage() {
    return this.body.request.command;
  }

  get isUserEntered() {
    return this.body.session.new;
  }

  get state() {
    return this.body.state?.application;
  }

  get sessionState() {
    return this.body.state?.session;
  }
}
