import { reply } from 'alice-renderer';
import { Base } from './Base';

export class InvalidDate extends Base {
  match() {
    return this.matchRegexp(/конкретн/);
  }

  reply() {
    return reply`
      Какой день вас интересует?
      ${this.getComment()}
      ${this.matchedAsDefault ? `${this.getMessage()}?` : ''}
      ${this.getButtons()}
    `;
  }

  getComment() {
    return [
      '',
      'А то у меня тут 300 событий в каталоге! 😱',
    ];
  }
}
