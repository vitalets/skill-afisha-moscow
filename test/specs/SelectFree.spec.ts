describe.skip('SelectFree', () => {

  async function gotoSelectFree() {
    const user = new User();
    await user.enter();
    await user.say('да');
    await user.say('сегодня');
    return user;
  }

  it('повторный вход', async () => {
    const user = await gotoSelectFree();
    await user.enter();

    assert.include(user.response.text, 'Ну что, смотрю только бесплатные события или за денежку тоже');
  });

  it('бесплатные', async () => {
    const user = await gotoSelectFree();
    await user.say('бесплатные');

    assert.include(user.response.text, 'Ну и правильно! Можно будет купить мороженное!');
    assert.deepEqual(user.state.application.filter.free, true);
  });

  it('любые', async () => {
    const user = await gotoSelectFree();
    await user.say('любые');

    assert.include(user.response.text, 'Скупой платит дважды');
    assert.deepEqual(user.state.application.filter.free, false);
  });

});
