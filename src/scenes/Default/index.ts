import { Scene } from '../../../bot-components';
import { Enter as EnterWelcome } from '../Welcome/Enter';

export const defaultScene: Scene = new Scene({
  id: 'default',
  continue: null,
  loop: () => [
    EnterWelcome,
  ]
});
