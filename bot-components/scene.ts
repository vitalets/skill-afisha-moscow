import { ComponentConstructor } from './component';

const scenes = new Map<string, Scene>();

export interface SceneOptions {
  id: string;
  /** Set component to handle continue/return to this scene */
  continue: null | (() => ComponentConstructor),
  /** Set array of components to handle messages inside scene */
  loop: () => ComponentConstructor[],
}

export class Scene {
  static getById(sceneId?: string) {
    if (sceneId) {
      return scenes.get(sceneId);
    }
  }

  constructor(private options: SceneOptions) {
    if (scenes.has(this.id)) {
      throw new Error(`Duplicate scene is: ${this.id}`);
    }
    scenes.set(this.id, this);
  }

  get id() {
    return this.options.id;
  }

  getLoopComponents() {
    return this.options.loop();
  }

  getContinueComponent() {
    return this.options.continue?.();
  }
}
