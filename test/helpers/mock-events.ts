import { Event } from '../../src/events/v4/event';

let interceptor: ReturnType<ReturnType<typeof nock>['get']>;

function updateIntercaptor() {
  interceptor && nock.removeInterceptor(interceptor);
  interceptor = nock('https://www.mos.ru').get('/api/newsfeed/v4/frontend/json/ru/afisha').query(true);
}

export function mockEvents(items: Partial<Event>[]) {
  updateIntercaptor();
  items = items.map((item, i) => Object.assign({}, defaultEvents[i], item));
  return interceptor.reply(200, { items });
}

export const defaultEvents = [
  {
    id: 1,
    title: 'Живая музыка в Измайловском парке',
    date_from: '2021-06-02 19:00:00',
    date_to: '2021-06-29 20:00:00',
    free: 1,
    restriction: { age: 12 },
    spheres: [ { id: 78299 }, { id: 84299 } ],
    auditories: [ { id: 5087 } ],
    spots: [
      {
        address: 'Народный проспект, 17 к1 ст10',
        lon: '37.752028',
        lat: '55.785376'
      }
    ]
  },
  {
    id: 2,
    title: 'Вокальный концерт в молодежной библиотеке имени М.А. Светлова',
    date_from: '2021-06-13 20:00:00',
    date_to: '2021-06-13 21:30:00',
    free: 0,
    restriction: { age: 12 },
    spheres: [ { id: 78299 } ],
    auditories: [ { id: 5087 } ],
    spots: [
      {
        address: 'Большая Садовая улица, дом 1',
        lon: '37.590623',
        lat: '55.766309'
      }
    ]
  }
];
