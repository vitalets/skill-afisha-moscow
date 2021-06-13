import { Scene } from '../../../bot-components';
import { Continue } from './Enter';
import { Done } from './Done';

export const selectSphereScene: Scene = new Scene({
  id: 'select-sphere',
  continue: () => Continue,
  loop: () => [
    Done,
  ]
});
