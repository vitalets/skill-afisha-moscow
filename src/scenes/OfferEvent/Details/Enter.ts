import { reply, buttons, text, tts, br } from 'alice-renderer';
import { Event } from '../../../events/v4';
import { Component } from '../../Component';
import { prettyDate } from '../../../utils/date';
import { eventDetailsScene } from '.';

interface Payload {
  event?: Event;
}

export class Enter extends Component {
  nextScene = eventDetailsScene;
  event?: Event;

  match() {
    this.event = (this.ctx.request.body.request.payload as Payload)?.event;
    return Boolean(this.event);
  }

  reply() {
    return reply`
        📌
        ${tts(this.sounds.tts.arpha)}
        ${tts(['Вот детали события:', 'Показываю детали события:'])}
        ${this.event!.title}.
        ${this.showAddress()}
        ${this.showDates()}
        ${this.showPhone()}
        ${buttons([
    ...this.getSuggestButtons(),
    ...this.getEventButtons(),
  ])}
    `;
  }

  showAddress() {
    const { address } = this.event!.spots[0];
    if (address) {
      return reply`${br(2)}${text(`📍  ${address}`)}`;
    }
  }

  showDates() {
    const { date_from, date_to } = this.event!;
    const dateFrom = prettyDate(date_from);
    const dateTo = prettyDate(date_to);
    if (dateFrom && dateTo) {
      const range = [
        dateFrom.day,
        dateFrom.time,
        '-',
        dateTo.day !== dateFrom.day ? dateTo.day : '',
        dateTo.time,
      ].join(' ');
      return reply`${br(2)}${text(`⏱ ${range}`)}`;
    }
  }

  showPhone() {
    const { phone } = this.event!.foundation || {};
    if (phone) {
      return reply`${br(2)}${text(`📞  ${phone}`)}`;
    }
  }

  getSuggestButtons() {
    return [
      'ещё события 🎉',
      'спасибо 🙏',
    ];
  }

  getEventButtons() {
    return [
      this.getMoreButton(),
      this.getMapButton(),
      this.getCalendarButton(),
    ];
  }

  getMoreButton() {
    return {
      title: '🌐  Билеты на сайте',
      url: getEventUrl(this.event!),
      hide: false
    };
  }

  // see: https://yandex.ru/dev/yandex-apps-launch/maps/doc/concepts/yandexmaps-web.html
  getMapButton() {
    const { address, lon, lat } = this.event!.spots[0];
    if (address) {
      // если в адресе нет цифр, то показываем на карте метку по координатам
      // это полезно для общих адресов, например Парк "Сокольники"
      const ll = /\d+/.test(address) ? '' : `&ll=${lon},${lat}`;
      return {
        title: '🚗  Маршрут',
        url: `https://yandex.ru/maps/?z=10${ll}&text=${encodeURIComponent(address)}`,
        hide: false
      };
    }
  }

  getCalendarButton() {
    return {
      title: '📆  Добавить в календарь',
      url: this.isIos() ? undefined : buildGoogleCalendarLink(this.event!),
      hide: false
    };
  }
}

function getEventUrl(event: Event) {
  return `https://www.mos.ru${event.url}`;
}

// see: https://stackoverflow.com/questions/10488831/link-to-add-to-google-calendar
function buildGoogleCalendarLink(event: Event) {
  const url = new URL('http://www.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', event.title);
  url.searchParams.set('details', getEventUrl(event));
  // url.searchParams.set('dates', '20140127T224000Z/20140320T221500Z');
  return url.toString();
}
