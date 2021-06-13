// See: https://github.com/TypeStrong/ts-node#help-my-types-are-missing
/// <reference types="../src/externals" />

import chai from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import { ReqBody } from 'alice-types';
import renderer from 'alice-renderer';
import { User } from './helpers/user';
import { mockEvents, defaultEvents } from './helpers/mock-events';
import { mockDate, DayOfWeek } from './helpers/mock-date';
import { handler } from '../src';

type AssertType = typeof chai.assert;
type UserType = typeof User;
type nockType = typeof nock;
type sinonType = typeof sinon;

declare global {
  const assert: AssertType;
  const User: UserType;
  const nock: nockType;
  const sinon: sinonType;
}

chai.config.truncateThreshold = 0;
User.config.webhookUrl = (reqBody: ReqBody) => handler(reqBody, { requestId: 'xxx' });
renderer.configure({ disableRandom: true });

Object.assign(global, {
  assert: chai.assert,
  User,
  nock,
  sinon,
});

beforeEach(() => {
  mockEvents(defaultEvents).persist();
  mockDate(DayOfWeek.Monday);
});

afterEach(() => {
  nock.cleanAll();
  sinon.restore();
});
