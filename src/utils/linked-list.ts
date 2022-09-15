class LinkedList<T> {
  private store: T[];

  constructor(list: T[]) {
    this.store = list;
  }

  prepend(item: T) {
    this.store = [item, ...this.store];
  }
  append(item: T) {
    this.store = [...this.store, item];
  }
  addByIndex(index: number, item: T) {
    this.store.splice(index, 0, item);
  }
  deleteByIndex(index: number) {
    this.store.splice(index, 1);
  }
  deleteHead() {
    this.store.splice(0, 1);
  }
  deleteTail() {
    this.store.splice(this.store.length - 1, 1);
  }
  elements() {
    return this.store;
  }
}

export default new LinkedList(["0", "34", "8", "1"]);
