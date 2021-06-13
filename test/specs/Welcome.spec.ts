describe('Welcome', () => {

  const WELCOME_KEYWORD = 'Я Ваш персональный ассистент';

  it('вход в приложение', async () => {
    const user = new User();

    await user.enter();

    assert.include(user.response.text, WELCOME_KEYWORD);
    assert.equal(user.response.buttons.length, 1);
  });

  // it('ExistingUser', async () => {

  // });

});
