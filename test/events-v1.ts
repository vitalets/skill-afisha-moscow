/**
 * Check events on mos.ru
 * npx ts-node test/events-v1
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { SearchParams } from '../src/events/v1/params';
import { Sphere } from '../src/events/v1/sphere';
import { fetchEvents, Event } from '../src/events/v1';

main();

async function main() {
  const searchParams = new SearchParams();

  const dateFrom = new Date();
  const dateTo = new Date();
  dateTo.setDate(dateTo.getDate() + 2);
  searchParams.setDateRange(dateFrom.valueOf(), dateTo.valueOf());
  //searchParams.setTypes([ Type.Children ]);
  searchParams.setSpheres([ Sphere.Exibition ]);
  //searchParams.setFree();

  searchParams.pagesize = 20;

  const events = await fetchEvents(searchParams);

  // события, которые начались не раньше чем за день до заданной даты
  //const dateFromMinusDay = Math.round(new Date('2021-06-01T00:00:00+03:00').valueOf() / 1000);
  //events = events.filter(event => event.date_from > dateFromMinusDay);
  console.log(events.length);
  console.log(countBy(events, 'sphere_title'));
  console.log(events.map(event => stringifyEvent(event)));
  //console.log(events.map(event => stringifyEvent(event)));
}

function stringifyEvent(event: Event) {
  const { date_from, date_to } = event;
  const dateFrom = new Date(date_from * 1000);
  const dateTo = new Date(date_to * 1000);
  return [
    `[${event.sphere_title}, ${event.sphere_id}]`,
    event.title,
    event.address_title,
    event.place_title,
    `${dateFrom.toLocaleString()} - ${dateTo.toLocaleString()}`,
  ].join('|');
}

function countBy<T, K extends keyof T>(data: T[], prop: K) {
  const result: Record<string, number> = {};
  data.forEach(item => {
    const value = item[prop] as unknown as string;
    result[value] = result[value] || 0;
    result[value]++;
  });
  return result;
}
