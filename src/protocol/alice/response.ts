/**
 * Alice request.
 */
import { ResBody } from 'alice-types';

export class AliceResponse {
  isEmpty = true;
  readonly body: ResBody = {
    response: { text: '', end_session: false },
    version: '1.0'
  };

  get data() {
    return this.body.response;
  }

  set data(value: ResBody['response']) {
    this.isEmpty = false;
    this.body.response = value;
  }

  get text() {
    return this.body.response.text;
  }

  set state(value: unknown) {
    this.body.application_state = value;
  }

  set sessionState(value: unknown) {
    // todo: check for 1Kb
    this.body.session_state = value;
  }
}
