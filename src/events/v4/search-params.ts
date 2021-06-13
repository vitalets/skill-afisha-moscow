import { Sphere, Auditorie } from './sphere';

export class Filter {
  dateFrom = 0;
  dateTo = 0;
  free?: boolean;
  forChildren?: boolean;
  spheres?: Sphere[];

  toString() {
    return JSON.stringify({
      '>=date_to': stringifyDate(this.dateFrom),
      '<=date_from': stringifyDate(this.dateTo),
      'spheres.id': this.spheres && this.spheres.length ? this.spheres : undefined,
      'free': this.free ? 1 : undefined,
      'auditories.id': this.forChildren ? Auditorie.Children : undefined,
    });
  }
}

export class SearchParams {
  searchParams = new URLSearchParams();
  filter = new Filter();

  constructor() {
    this.searchParams.set('per-page', '30'); // max 100!
    this.searchParams.set('expand', 'spheres,foundation,spots,url,districts');
    this.setFields([
      'id',
      'title',
      'url',
      'date_from',
      'date_to',
      'free',
      'spheres.id',
      'foundation.phone',
      'spots.address',
      'spots.lon',
      'spots.lat',
      'districts.id',
      'restriction.age',
    ]);
  }

  toString() {
    this.searchParams.set('filter', this.filter.toString());
    return this.searchParams.toString();
  }

  setFields(fields: string[]) {
    this.searchParams.set('fields', fields.join(','));
  }
}

/**
 * Stringify date as '2021-06-01 00:00:00' (in UTC timezone)
 */
function stringifyDate(timestamp: number) {
  return new Date(timestamp).toISOString().replace(/T|\.\d+Z$/g, ' ').trim();
}
