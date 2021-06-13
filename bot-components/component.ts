import { Scene } from './scene';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor = new (...args: any[]) => Component;

export class Component {
  /** Set scene to handle next message */
  nextScene?: Scene;
  /** Set component to handle current message */
  nextComponent?: ComponentConstructor | ComponentConstructor[];
  /** Was component mathced by mathc() method or as default (last) component in scene */
  matchedAsDefault = false;
  /** Custom props */
  props = {};

  static props = {};

  // see: https://github.com/microsoft/TypeScript/issues/5863
  static withProps<T extends Component>(props: Partial<T['props']>, newName?: string) {
    const NewConstructor = class extends this { };
    Object.defineProperty(NewConstructor, 'name', { value: newName || this.name });
    NewConstructor.props = Object.assign({}, this.props, props);
    return NewConstructor;
  }

  match(): boolean | void {

  }

  async handle() {

  }

  reply() {

  }
}
