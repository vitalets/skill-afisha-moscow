import { mockEvents } from '../helpers/mock-events';

describe('OfferEvent', () => {

  async function gotoOfferEvent() {
    const user = new User();
    await user.enter();
    await user.say('да');
    await user.say('выставки');
    await user.say('выходные');
    return user;
  }

  it('инфа о событии', async () => {
    const user = await gotoOfferEvent();

    assert.deepEqual(user.response.buttons.length, 3);
  });

  it('другой день', async () => {
    const user = await gotoOfferEvent();
    await user.say('другой день');

    assert.include(user.response.text, 'Выбирайте другой день');
  });

  it.skip('добавлять название сферы если событие начинается с кавычек', async () => {
    mockEvents([{
      title: '«История Измайловского острова» в усадьбе Измайлово',
      spheres: [{ id: 81299 }],
    }]);

    const user = await gotoOfferEvent();

    assert.include(user.response.text, 'выставка «История Измайловского острова»');
  });

  it.skip('вырезать инициалы из tts', async () => {
    mockEvents([{
      title: 'Посещение экспозиции Музея М.А. Булгакова',
      spheres: [{ id: 81299 }],
    }]);

    const user = await gotoOfferEvent();

    assert.include(user.response.text, 'посещение экспозиции Музея М.А. Булгакова');
    assert.include(user.response.tts, 'посещение экспозиции Музея Булгакова');
  });

});
