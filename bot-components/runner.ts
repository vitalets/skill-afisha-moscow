import { Scene } from './scene';
import { Component, ComponentConstructor } from './component';

interface RunnerOptions {
  defaultScene: Scene;
  alwaysScene?: Scene;
  sceneId: string;
  // createComponent: <T extends new () => any>(Ctor: T) => T;
  // createComponent: <T extends Component>(Ctor: { new(): T ;}) => T;
  // createComponent: <T extends typeof Function>(Ctor: T) => InstanceType<T>;
  // createComponent: <T extends Component>(Ctor: new () => T) => T;
  // createComponent: <T extends Component>(Ctor: typeof T) => T;
  // can't write type for that function :(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponent: (Ctor: any) => Component;
}

export class Runner {
  oldScene: Scene;
  newScene: Scene;
  matchedComponents: Component[] = [];

  constructor(private options: RunnerOptions) {
    this.oldScene = Scene.getById(this.options.sceneId) || this.options.defaultScene;
    this.newScene = this.oldScene;
  }

  async run() {
    const initialComponents = this.getInitialComponents();
    await this.loop(initialComponents);
  }

  private getInitialComponents() {
    const sceneComponents = this.oldScene.getLoopComponents();
    return [
      ...sceneComponents,
      ...this.options.alwaysScene ? this.options.alwaysScene.getLoopComponents() : [],
      sceneComponents[sceneComponents.length - 1],
    ];
  }

  private async loop(initialComponents: ComponentConstructor[]) {
    let loopOrComponent: Component['nextComponent'] = initialComponents;
    do {
      const matchedComponent: Component = Array.isArray(loopOrComponent)
        ? this.getMatchedComponent(loopOrComponent)
        : this.createComponent(loopOrComponent);
      await this.handleComponent(matchedComponent);
      loopOrComponent = matchedComponent.nextComponent;
    } while (loopOrComponent);
  }

  private getMatchedComponent(loop: ComponentConstructor[]) {
    loop = loop.filter(Boolean);

    for (const Child of loop) {
      const component = this.createComponent(Child);
      const matched = component.match();
      // console.log(component.constructor.name, matched)
      if (matched) {
        return component;
      }
    }

    return this.getDefaultComponent(loop);
  }

  private getDefaultComponent(loop: ComponentConstructor[]) {
    const LastChild = loop[loop.length - 1];
    if (LastChild) {
      const component = this.createComponent(LastChild);
      component.matchedAsDefault = true;
      return component;
    } else {
      throw new Error(`Empty components loop.`);
    }
  }

  private createComponent(Ctor?: ComponentConstructor) {
    if (!Ctor) {
      throw new Error('Empty component constructor');
    }
    const component = this.options.createComponent(Ctor);
    Object.assign(component.props, (Ctor as typeof Component).props);
    return component;
  }

  private async handleComponent(component: Component) {
    this.matchedComponents.push(component);
    await component.handle();
    component.reply();
    this.newScene = component.nextScene || this.newScene;
  }
}
