import { Event } from '../../events/v4/event';
import { SphereTitle } from '../../events/v4/sphere';
import { Filter } from '../../state/filter';

export function getEventTitle(event: Event) {
  // ищем сферу, для которой нужно показывать название (например "выставка")
  const sphereWithTitle = event.spheres.find(s => SphereTitle[s.id]);
  const sphereTitle = sphereWithTitle && SphereTitle[sphereWithTitle.id];
  // начинается с елочек « и не содержит в себе название сферы
  if (sphereTitle && event.title.startsWith('«') && !event.title.toLowerCase().includes(sphereTitle)) {
    return `${sphereTitle} ${event.title}`;
  } else {
    return lowerFirstLetter(event.title);
  }
}

export function stripInitials(str: string) {
  return str.replace(/[А-Я]\.[А-Я]\./g, '');
}

function lowerFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function canShowEvent(event: Event, filter: Filter) {
  const { free } = filter.data;
  return (!free || event.free);
}
