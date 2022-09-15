class LinkedList<T> {
  private store: T[];

  constructor(list: T[]) {
    this.store = list;
  }

  elements() {
    return this.store;
  }
}

export default new LinkedList([0, 34, 8, 1]);
