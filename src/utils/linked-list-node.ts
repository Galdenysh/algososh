export class LinkedListNode<T> {
  item: T;
  nextItem: LinkedListNode<T> | null;

  constructor(item: T, nextItem?: LinkedListNode<T> | null) {
    this.item = item;
    this.nextItem = nextItem ?? null;
  }
}
