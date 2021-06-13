import { Scene } from '../../../bot-components';
import { Enter } from './Enter';
import { Enter as EnterSelectSphere } from '../SelectSphere/Enter';

export const welcomeScene: Scene = new Scene({
  id: 'welcome',
  continue: () => Enter,
  loop: () => [
    EnterSelectSphere,
  ]
});
