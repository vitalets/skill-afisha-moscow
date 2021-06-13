import { Scene } from '../../../bot-components';
import { Continue } from './Enter';
import { All } from './All';
import { OnlyFree } from './OnlyFree';

export const selectFreeScene: Scene = new Scene({
  id: 'select-free',
  continue: () => Continue,
  loop: () => [
    OnlyFree,
    All,
  ]
});
