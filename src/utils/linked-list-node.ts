class LinkedListNode<T> {
  item: T;
  nextItem: T;

  constructor(item: T, nextItem: T) {
    this.item = item;
    this.nextItem = nextItem;
  }
}

export default new LinkedListNode(0, 0);
