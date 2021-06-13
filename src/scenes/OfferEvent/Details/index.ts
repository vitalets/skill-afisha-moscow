import { Scene } from '../../../../bot-components';
import { MoreEvents } from './MoreEvents';
import { AddToCalendar } from './AddToCalendar';
import { NoMoreEvents } from './NoMoreEvents';

export const eventDetailsScene: Scene = new Scene({
  id: 'event-details',
  continue: () => MoreEvents,
  loop: () => [
    NoMoreEvents,
    AddToCalendar,
    MoreEvents,
  ]
});
