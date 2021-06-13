import { Scene } from '../../../bot-components';
import { Continue } from './Enter';
import { Reject } from './Reject';
import { Enter as EnterDetails } from './Details/Enter';
import { ChangeDate } from '../SelectDate/Enter';
import { Done as DoneSelectSphere } from '../SelectSphere/Done';

export const offerEventScene: Scene = new Scene({
  id: 'offer-event',
  continue: () => Continue,
  loop: () => [
    EnterDetails,
    ChangeDate,
    DoneSelectSphere,
    Reject,
  ]
});
