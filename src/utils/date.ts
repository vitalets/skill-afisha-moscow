export const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

// 2021-09-12 16:45:00 -> { day: '12 сентября', time: '16:45'}
export function prettyDate(str?: string) {
  const matches = (str || '').match(/\d\d\d\d-(\d\d)-(\d\d)\s+(\d\d):(\d\d)/);
  if (matches) {
    const [ month, day, hour, minute ] = matches.slice(1);
    const prettyMonth = months[Number(stripLeadingZero(month)) - 1];
    const prettyDay = stripLeadingZero(day);
    return {
      day: `${prettyDay} ${prettyMonth}`,
      time: `${hour}:${minute}`,
    };
  }
}

function stripLeadingZero(s: string) {
  return s.replace(/^0+/, '');
}
