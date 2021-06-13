import { Scene } from '../../../bot-components';
import { Component } from '../Component';

// Повторный вход в приложение, пока не протухла сессия.
// Пробуем отправить пользователя на компонент Continue текущей сцены.
// Если у текущей сцены нет Continue, то отработает последний компонент (как обычно).
export class Reenter extends Component {
  match() {
    if (this.ctx.request.isUserEntered && !this.userMessage) {
      const scene = Scene.getById(this.ctx.runner?.oldScene.id);
      this.nextComponent = scene?.getContinueComponent();
      return Boolean(this.nextComponent);
    }
  }
}
