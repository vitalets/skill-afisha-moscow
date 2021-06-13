/**
 * Serverless function invoke helpers.
 */
import { ReqBody } from 'alice-types';

export type ServerlessEvent = ReqBody | ServerlessHttpEvent;

export interface ServerlessHttpEvent {
  httpMethod: string;
  body: string;
}

export interface ServerlessContext {
  requestId: string;
  token?: {
    access_token: string;
  }
}

export function getRequestBody(event: ServerlessEvent): unknown {
  return isHttpRequest(event) ? JSON.parse(event.body) : event;
}

export function isHttpRequest(event: ServerlessEvent): event is ServerlessHttpEvent {
  return Boolean((event as ServerlessHttpEvent).httpMethod);
}

export function buildResponse(event: ServerlessEvent, json: unknown) {
  return isHttpRequest(event) ? buildHttpResponse(json) : json;
}

function buildHttpResponse(json: unknown) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    isBase64Encoded: false,
    body: JSON.stringify(json),
  };
}
