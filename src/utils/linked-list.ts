import { LinkedListNode } from "./linked-list-node";

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private size: number = 0;

  prepend(item: T) {
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
    } else {
      node.nextItem = this.head;
      this.head = node;
    }

    this.size++;
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

    this.size++;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.nextItem;
      this.size--;
    }
  }

  deleteTail() {
    if (this.size === 1) this.clear();

    if (this.head) {
      let current = this.head;

      for (let i = 1; i < this.size - 1; i++) {
        if (current.nextItem) current = current.nextItem;
      }

      current.nextItem = null;
      this.size--;
    }
  }

  addByIndex(index: number, item: T) {
    //
  }

  deleteByIndex(index: number) {
    //
  }

  clear() {
    this.head = null;
    this.size = 0;
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
