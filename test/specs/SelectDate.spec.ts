import { mockDate, getMskDate, DayOfWeek } from '../helpers/mock-date';

describe('SelectDate', () => {

  const WEEKEND_KEYWORD = 'Выходные только для отдыха и развлечений';

  async function gotoSelectDate() {
    const user = new User();
    await user.enter();
    await user.say('да');
    await user.say('выставки');
    return user;
  }

  it('повторный вход', async () => {
    const user = await gotoSelectDate();
    await user.enter();

    assert.include(user.response.text, 'Итак, мы остановились на выборе даты');
  });

  it('саджест: до 19', async () => {
    mockDate(DayOfWeek.Monday, 18);
    const user = await gotoSelectDate();

    assert.include(user.response.text, 'Сегодня, завтра или ближайшие выходные');
    assert.deepEqual(user.response.buttons, [
      { hide: true, title: 'сегодня' },
      { hide: true, title: 'завтра' },
      { hide: true, title: 'выходные' }
    ]);
  });

  it('саджест: после 19', async () => {
    mockDate(DayOfWeek.Monday, 19);
    const user = await gotoSelectDate();

    assert.include(user.response.text, 'Завтра, ближайшие выходные или конкретный день');
    assert.deepEqual(user.response.buttons, [
      { hide: true, title: 'завтра' },
      { hide: true, title: 'выходные' }
    ]);
  });

  it('сегодня', async () => {
    const user = await gotoSelectDate();
    await user.say('сегодня');

    assert.include(user.response.text, 'действуем здесь и сейчас');
  });

  it('завтра', async () => {
    const user = await gotoSelectDate();
    await user.say('завтра');

    assert.include(user.response.text, 'Хорошее дело нельзя откладывать');
  });

  it('пятница', async () => {
    const user = await gotoSelectDate();
    await user.say('как на счет пятницы?');

    assert.include(user.response.text, 'Спасибо Боже, что создал пятницу');
  });

  it('в будни предлагать "ближайшие выходные"', async () => {
    mockDate(DayOfWeek.Monday);

    const user = await gotoSelectDate();

    assert.include(user.response.text, 'ближайшие выходные');
    assert.deepEqual(user.response.buttons, [
      { hide: true, title: 'сегодня' },
      { hide: true, title: 'завтра' },
      { hide: true, title: 'выходные' }
    ]);

    await user.say('в выходные');

    assert.include(user.response.text, WEEKEND_KEYWORD);
    assert.deepEqual(user.state.application.filter.dateRange, {
      dateFrom: getMskDate(5).valueOf(),
      dateTo: getMskDate(7).valueOf(),
    });
  });

  it('в субботу предлагать "все выходные"', async () => {
    mockDate(DayOfWeek.Saturday);

    const user = await gotoSelectDate();

    assert.include(user.response.text, 'все выходные');
    await user.say('в выходные');

    assert.include(user.response.text, WEEKEND_KEYWORD);
    assert.deepEqual(user.state.application.filter.dateRange, {
      dateFrom: getMskDate(0).valueOf(),
      dateTo: getMskDate(2).valueOf(),
    });
  });

  it('в воскресенье предлагать "следующие выходные"', async () => {
    mockDate(DayOfWeek.Sunday);

    const user = await gotoSelectDate();

    assert.include(user.response.text, 'следующие выходные');
    await user.say('выходные');

    assert.include(user.response.text, WEEKEND_KEYWORD);
    assert.deepEqual(user.state.application.filter.dateRange, {
      dateFrom: getMskDate(6).valueOf(),
      dateTo: getMskDate(8).valueOf(),
    });
  });

  it('конкретный день', async () => {
    const user = await gotoSelectDate();
    const entities = [{"type":"YANDEX.DATETIME","tokens":{"start":0,"end":2},"value":{"month":7,"day":13,"month_is_relative":false,"day_is_relative":false}}];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await user.say('13 июля', (body: any) => body.request.nlu.entities = entities);

    assert.include(user.response.text, 'Обожаю людей, которые все планируют');
    assert.include(user.response.text, '13 июля');
  });

});
