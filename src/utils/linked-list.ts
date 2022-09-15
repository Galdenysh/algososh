import { LinkedListNode } from "./linked-list-node";

class LinkedList<T> {
  // private store: T[];
  private head: LinkedListNode<T> | null = null;

  // constructor(list: T[]) {
  //   this.store = list;
  // }

  prepend(item: T) {
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
    } else {
      node.nextItem = this.head;
      this.head = node;
    }
  }
  append(item: T) {
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.nextItem) {
        current = current.nextItem;
      }

      current.nextItem = node;
    }
  }
  addByIndex(index: number, item: T) {
    // this.store.splice(index, 0, item);
  }
  deleteByIndex(index: number) {
    // this.store.splice(index, 1);
  }
  deleteHead() {
    // this.store.splice(0, 1);
  }
  deleteTail() {
    // this.store.splice(this.store.length - 1, 1);
  }
  clear() {
    this.head = null;
  }
  elements() {
    let curr = this.head;
    let res: T[] = [];

    while (curr) {
      res.push(curr.item);
      curr = curr.nextItem;
    }

    return res;
  }
}

export default new LinkedList();
