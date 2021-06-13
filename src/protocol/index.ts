import { AliceRequest } from './alice/request';
import { AliceResponse } from './alice/response';

export type Request = AliceRequest;
export type Response = AliceResponse;

export function initRequest(reqBody: unknown) {
  if (AliceRequest.match(reqBody)) {
    return new AliceRequest(reqBody);
  }
  // todo: sber request
  throw new Error(`Unsupported request: ${JSON.stringify(reqBody)}`);
}

export function initResponse(request: Request) {
  if (request.isAlice) {
    return new AliceResponse();
  }
  // todo: sber response
  throw new Error(`Unsupported response`);
}
