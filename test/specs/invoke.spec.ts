import nodeAssert from 'assert';

describe('invoke', () => {

  it('вызов по http (post)', async () => {
    const webhookUrl = async (reqBody: unknown) => {
      const res = await User.config.webhookUrl({
        httpMethod: 'POST',
        body: JSON.stringify(reqBody),
      });
      return JSON.parse(res.body);
    };
    const user = new User(webhookUrl);
    await user.enter();

    assert.include(user.response.text, 'Привет');
  });

  // it('вызов по http (get)');

  it('ping', async () => {
    const user = new User();
    await user.enter('ping');

    assert.include(user.response.text, 'pong');
  });

  it('error: invalid json', async () => {
    const webhookUrl = async () => {
      const res = await User.config.webhookUrl({
        httpMethod: 'POST',
        body: 'foo',
      });
      return JSON.parse(res.body);
    };
    const user = new User(webhookUrl);

    const promise = user.enter();
    await nodeAssert.rejects(promise, /SyntaxError: Unexpected token/);
  });

  // todo: handle trigger invocation
});
