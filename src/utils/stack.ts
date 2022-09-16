class Stack<T> {
  private store: T[] = [];

  push(item: T) {
    this.store.push(item);
  }
  pop() {
    this.store.pop();
  }
  peek() {
    return this.store[this.store.length - 1];
  }
  clear() {
    this.store = [];
  }
  elements() {
    return this.store;
  }
  size() {
    return this.store.length;
  }
}

export default new Stack();
