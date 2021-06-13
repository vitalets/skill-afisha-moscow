import { Scene } from '../../../bot-components';
import { Exit } from './Exit';
import { Help } from './Help';
import { Reset } from './Reset';
import { Reenter } from './Reenter';

export const alwaysScene: Scene = new Scene({
  id: 'always',
  continue: null,
  loop: () => [
    Exit,
    Help,
    Reenter,
    Reset,
  ]
});
