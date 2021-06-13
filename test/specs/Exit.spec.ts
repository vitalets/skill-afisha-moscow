describe('Exit', () => {

  it('выход', async () => {
    const user = new User();

    await user.enter();
    await user.say('хватит');
    assert.include(user.response.text, 'Закончить подбор мероприятий');

    await user.say('да');
    assert.include(user.response.text, 'До новых встреч');
  });

  it('отмена выхода: возврат к предыдущей сцене', async () => {
    const user = new User();

    await user.enter();
    await user.say('начинаем');
    await user.say('хватит');
    await user.say('нет');

    assert.include(user.response.text, 'Итак, что выбираете?');
  });

});
