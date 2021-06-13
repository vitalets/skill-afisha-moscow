import { reply } from 'alice-renderer';
import { Scene } from '../../../bot-components';
import { Component } from '../Component';
import { defaultScene } from '../Default';

// Универсальный компонент возврата на предыдущую сцену.
// Используется при отклонениях от основного сценария.
// В always сцене напрямую не задйствован, вызывается из других компонентов.
export class ReturnToPrevScene extends Component {
  reply() {
    this.setNextScene();
    this.setNextComponent();
    if (!this.nextComponent && this.ctx.response.isEmpty) {
      return reply`
        На чем мы остановились?
      `;
    }
  }

  setNextScene() {
    const prevSceneId = this.ctx.session.data.prevSceneId;
    this.nextScene = Scene.getById(prevSceneId);
    if (!this.nextScene) {
      this.ctx.logger.warn(`Return to unknown scene: ${prevSceneId}`);
      this.nextScene = defaultScene;
    }
  }

  setNextComponent() {
    this.nextComponent = this.nextScene!.getContinueComponent();
    if (!this.nextComponent) {
      this.ctx.logger.warn(`No continue component for scene: ${this.nextScene!.id}`);
    }
  }
}
