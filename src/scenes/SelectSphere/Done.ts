import { reply, enumerate, tts } from 'alice-renderer';
import { Component } from '../Component';
import { SphereTitleMany, Sphere } from '../../events/v4';
import { NextFilterOrEvent } from '../Utils/NextFilterOrEvent';

const sphereRegexp: Record<Sphere, RegExp> = {
  [Sphere.Spectacle]: /спектакл/,
  [Sphere.Exibition]: /выставк/,
  [Sphere.Excursion]: /экскурси/,
  [Sphere.MasterClass]: /мастер/,
  [Sphere.Park]: /парк|свеж|воздух/,
  [Sphere.Sport]: /спорт/,
};

export class Done extends Component {
  nextComponent = NextFilterOrEvent;
  forChildren?: boolean;
  matchedSpheres: Sphere[] = [];

  match() {
    return [ this.matchChildren(), this.matchSphere() ].some(Boolean);
  }

  matchChildren() {
    delete this.ctx.filter.data.forChildren;
    if (this.matchRegexp(/дет[ей|и]|детьми|детски/)) {
      this.forChildren = true;
      this.ctx.filter.data.forChildren = true;
      return true;
    }
  }

  matchSphere() {
    for (const key of Object.keys(sphereRegexp) as unknown as Sphere[]) {
      const regexp = sphereRegexp[key];
      if (this.matchRegexp(regexp)) {
        const sphereId = Number(key);
        this.ctx.filter.data.spheres = this.ctx.filter.data.spheres.concat([ sphereId ]);
        this.matchedSpheres.push(sphereId);
      }
    }

    if (this.matchedSpheres.length > 0) {
      // пока перезатираем все сферы
      this.ctx.filter.data.spheres = this.matchedSpheres;
      return true;
    }
  }

  reply() {
    return this.matchedAsDefault
      ? this.replyNoSelection()
      : this.replyHasSelection();
  }

  replyHasSelection() {
    return reply`
      👌
      ${this.getSound()}
      ${this.getMsg()}
    `;
  }

  getMsg() {
    const titles = [
      ...this.matchedSpheres.map(sphereId => SphereTitleMany[sphereId]),
      this.ctx.filter.data.forChildren ? 'мероприятия для детей' : '',
    ];
    const titlesStr = enumerate(titles, { lastSeparator: ' и ' });
    return [
      `Поняла! Подыщу интересные ${titlesStr}.`,
      `Принято. Смотрю именно ${titlesStr}!`,
      `Окей! Буду рассказывать про ${titlesStr}!`,
      `Ок! Ищу ${titlesStr}.`,
    ];
  }

  getSound() {
    if (this.forChildren) {
      return tts(this.sounds.tts.children);
    } else if (this.matchedSpheres.includes(Sphere.Park)) {
      return tts(this.sounds.tts.forest);
    }
  }

  replyNoSelection() {
    return reply`
      🙌
      Такой вариант тоже подойдет!
    `;
  }
}

