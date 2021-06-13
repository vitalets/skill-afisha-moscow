import { Base } from './Base';

export class Reject extends Base {

  match() {
    return this.matchReject() || this.matchRegexp([
      /^еще$/,
    ]);
  }

  WOW = [
    'Ладно.',
    'Ладненько.',
    'Ну хорошо.',
    'Так.',
    'Так-с.',
    'Хм...',
    'Хорошо.',
    'Минутку...',
    'Секундочку...',
    'Сейчас подумаем!',
    'Дайте-ка подумать...',
  ];

  I_FOUND = [
    'Тогда посмотрите на это.',
    'Есть еще такие варианты.',
    'А как вам такой набор.',
    'А если вот такие.',
    'Или может такие варианты.',
    'Вот что еще нашла.',
    'А вот такой список.',
    'Все для Вас!',
  ];
}