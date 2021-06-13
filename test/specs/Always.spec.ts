describe('always', () => {

  it('все сначала', async () => {
    const user = new User();

    await user.enter();
    await user.say('бла бла');
    await user.say('все сначала');
    assert.include(user.response.text, 'Я Ваш персональный ассистент');
  });

  it('помощь/что ты умеешь', async () => {
    const user = new User();

    await user.enter();
    await user.say('помощь');
    assert.include(user.response.text, 'Только укажите день, и дальше я буду предлагать варианты');

    await user.say('что ты умеешь');
    assert.include(user.response.text, 'Только укажите день, и дальше я буду предлагать варианты');
  });

});
