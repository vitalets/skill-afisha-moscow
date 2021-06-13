import { reply } from 'alice-renderer';
import { Base } from './Base';
import { selectDateScene } from '.';

export class Enter extends Base {
  nextScene = selectDateScene;

  reply() {
    return reply`
      Теперь давайте определимся с датой.
      ${this.getSuggest()}
    `;
  }
}

export class EnterFromWelcome extends Enter {
  reply() {
    return reply`
      Только скажите день!
      ${this.getSuggest()}
    `;
  }
}

export class Continue extends Enter {
  reply() {
    return reply`
      Итак, мы остановились на выборе даты.
      ${this.getSuggest()}
    `;
  }
}

export class ChangeDate extends Enter {
  match() {
    return this.matchRegexp(/(другой|другая|смени(ть)?|измени(ть)?) день|дат[уа]/);
  }

  async handle() {
    delete this.ctx.filter.data.dateRange;
  }

  reply() {
    // todo: исключить дату, которая была только что
    return reply`
      ${this.replyChangeDate()}
      ${this.getSuggest()}
    `;
  }

  replyChangeDate() {
    return [
      'Ок! Выбирайте другой день!',
      'На какой день смотрим?',
      'Хорошо, давайте сменим! Чтобы выберете?',
      'Когда вы хотите себя выгулять?',
    ];
  }
}

// export class Enter extends Component {
//   nextScene = selectDateScene;
//   props = {
//     continue: false,
//     onlySuggest: false,
//   };

//   reply() {
//     return reply`
//       ${this.getMessage()}
//       ${this.getSuggest()}
//     `;
//   }

//   getMessage() {
//     if (!this.props.onlySuggest) {
//       return this.getContinueMessage() || this.askDate();
//     }
//   }

//   getContinueMessage() {
//     if (this.props.continue) {
//       // если в фильтре уже есть дата, то предлагаем сменить
//       return reply`
//         Итак, мы остановились на выборе даты.
//       `;
//     }
//   }

//   askDate() {
//     return reply`
//       Скажите дату.
//     `;
//   }

//   getSuggest() {
//     // todo: "следующие выходные", если сейчас уже выходные :)
//     return reply`
//       Сегодня, завтра или ближайшие выходные?
//       ${buttons([ 'сегодня', 'завтра', 'выходные'])}
//     `;
//   }
// }

// export const Continue = Enter.withProps<Enter>({ continue: true });
