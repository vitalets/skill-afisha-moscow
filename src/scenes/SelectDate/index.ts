import { Scene } from '../../../bot-components';
import { Continue } from './Enter';
import { RelativeDay } from './RelativeDay';
import { AbsoluteDay } from './AbsoluteDay';
import { DayOfWeek } from './DayOfWeek';
import { Weekend } from './Weekend';
import { InvalidDate } from './InvalidDate';

export const selectDateScene: Scene = new Scene({
  id: 'select-date',
  continue: () => Continue,
  loop: () => [
    RelativeDay,
    AbsoluteDay,
    DayOfWeek,
    Weekend,
    InvalidDate,
  ]
});
