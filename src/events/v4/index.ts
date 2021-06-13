/**
 * Search events via mos.ru (v4).
 */
import fetch from 'node-fetch';
import { SearchParams } from './search-params';
import { Event } from './event';
import { Sphere, SphereTitle, SphereTitleMany } from './sphere';

export {
  SearchParams,
  Event,
  Sphere,
  SphereTitle,
  SphereTitleMany,
};

const SEARCH_URL = 'https://www.mos.ru/api/newsfeed/v4/frontend/json/ru/afisha';

export async function fetchEvents(searchParams: SearchParams) {
  const url = `${SEARCH_URL}?${searchParams}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.ok) {
    const data = await response.json();
    // console.log(JSON.stringify(data.filters, null, 2))
    return data.items as Event[];
  } else {
    const message = `${response.status} ${await response.text()}`;
    throw new Error(message);
  }
}
