import { Base } from './Base';
import { offerEventScene } from '.';

export class Enter extends Base {
  nextScene = offerEventScene;

  I_FOUND = [
    'Есть вот такие варианты.',
    'Нашла такие события.',
    'Подобрала для вас такой список.',
  ];

  DO_YOU_LIKE_IT = [
    'Нажмите на то, что нравится. Или скажите "еще".',
  ];
}

export class Continue extends Enter {
  WOW = [];
  I_FOUND = [
    'Итак, я нашла для вас вот такие события:',
  ];
}

