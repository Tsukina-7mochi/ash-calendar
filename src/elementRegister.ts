export class ElementRegister<
  M extends Record<string, HTMLElement> = Record<string, never>,
> {
  private readonly map: M;

  constructor(map: M = {} as M) {
    this.map = map;
  }

  get<K extends keyof M>(key: K): M[K] {
    return this.map[key];
  }

  set<K extends keyof M>(key: K, element: M[K]) {
    this.map[key] = element;
  }

  setById<K extends keyof M>(key: K, id?: string) {
    const element = document.getElementById(id ?? (key as string));
    if (element === null) {
      throw Error(`Element with id ${id} is not found.`);
    }

    this.set(key, element as M[K]);
  }
}
