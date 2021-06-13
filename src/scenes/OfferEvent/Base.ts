import { reply, buttons } from 'alice-renderer';
import { shuffle, getRandomElement } from '../../utils';
import { Event, SearchParams, fetchEvents, SphereTitle, SphereTitleMany, Sphere } from '../../events/v4';
import { Component } from '../Component';
import { Enter as EnterSelectDate } from '../SelectDate/Enter';
import { Enter as EnterSelectSphere } from '../SelectSphere/Enter';
import { districts } from '../../events/v4/districts';

export class Base extends Component {
  events: Event[] = [];

  WOW = [''];
  I_FOUND = [''];

  DO_YOU_LIKE_IT = [
    'Выбирайте!',
    'Выбирайте из списка!',
    'Выбирайте! Или скажите "еще".',
    'Нажмите на то, что нравится.',
  ];

  async handle() {
    // todo: cache search results
    if (this.ctx.filter.data.dateRange) {
      const searchParams = this.buildSearchParams();
      const fetchedEvents = await fetchEvents(searchParams);
      this.events = this.filterEvents(fetchedEvents);
      this.sortEvents();
      this.events = this.events.slice(0, 3);
      this.events.forEach(event => this.ctx.user.saveOfferedEvent(event.id));
    } else {
      this.nextComponent = EnterSelectDate;
    }
  }

  private buildSearchParams() {
    const searchParams = new SearchParams();
    const { dateRange, free, forChildren, spheres } = this.ctx.filter.data;
    const { dateFrom, dateTo } = dateRange!;
    Object.assign(searchParams.filter, {
      dateFrom,
      dateTo,
      free,
      forChildren,
      spheres,
    });
    return searchParams;
  }

  private filterEvents(events: Event[]) {
    return events
      .filter(event => !this.ctx.user.data.offeredEvents.includes(event.id));
  }

  private sortEvents() {
    // шафлим, т.к. в выдаче часто похожие эвенты рядом
    shuffle(this.events);
    // события с тайтлом > 70 в конец!
    const TITLE_LEN = 70;
    this.events.sort((a, b) => {
      const aLen = a.title.length > TITLE_LEN ? 1 : -1;
      const bLen = b.title.length > TITLE_LEN ? 1 : -1;
      return aLen - bLen;
    });
  }

  reply() {
    return this.events.length
      ? this.replyHasEventList()
      : this.replyNoEvent();
  }

  replyHasEventList() {
    return reply`
      ${this.I_FOUND}
      ${this.replyEventsList()}
      ${this.DO_YOU_LIKE_IT}
      ${buttons(this.getSuggestButtons())}
    `;
  }

  replyNoEvent() {
    this.nextComponent = EnterSelectSphere;
    return reply`
      Ой, ничего не нашлось. ☹️
    `;
  }

  getSuggestButtons() {
    const notUsedSphereIds = (Object.keys(SphereTitleMany) as unknown as Sphere[])
      .filter(sphereId => !this.ctx.filter.data.spheres?.includes(sphereId));
    const notUsedSphereId = getRandomElement(notUsedSphereIds);
    return [
      'ещё события',
      notUsedSphereId && SphereTitleMany[notUsedSphereId],
      'другой день',
    ];
  }

  replyEventsList() {
    const items = this.events.map(event => {
      const description = [
        getSphereTitle(event),
        getDistrictTitle(event),
        event.free ? 'бесплатно' : 'платно',
        `${event.restriction.age}+`
      ].filter(Boolean).join(', ');
      return {
        title: `🔹 ${event.title}`,
        description: upperFirstLetter(description),
        button: {
          text: 'Подробнее',
          payload: {
            event
          }
        }
      };
    });
    return {
      card: {
        type: 'ItemsList',
        header: {
          text: 'Нажмите для подробностей:',
        },
        items,
      }
    };
  }
}

function upperFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getSphereTitle(event: Event) {
  const id = event.spheres.find(s => SphereTitle[s.id])?.id;
  return id && SphereTitle[id];
}

function getDistrictTitle(event: Event) {
  return districts.find(d => d.value === event.districts?.[0]?.id)?.label;
}
