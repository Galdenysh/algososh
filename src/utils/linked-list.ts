import { delay } from "./funcs";
import { LinkedListNode } from "./linked-list-node";

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private size: number = 0;
  private initArr: T[] | undefined;

  constructor(initArr?: T[]) {
    this.initArr = initArr;

    if (this.initArr) this._getStartItems(this.initArr);
  }

  private _getStartItems(arr: T[]) {
    arr.forEach((item) => this._fastAppend(item));
  }

  private _fastAppend(item: T) {
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

  async prepend(item: T) {
    await delay(500);
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
    } else {
      node.nextItem = this.head;
      this.head = node;
    }

    this.size++;
    return Promise.resolve("Item added");
  }

  async append(item: T) {
    await delay(500);
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
    return Promise.resolve("Item added");
  }

  async deleteHead() {
    if (this.head) {
      await delay(500);
      this.head = this.head.nextItem;
      this.size--;

      return Promise.resolve("Item removed");
    }

    return Promise.reject("Item not removed");
  }

  async deleteTail() {
    if (this.size === 1) {
      await delay(500);
      this.clear();

      return Promise.resolve("Item removed");
    }

    if (this.head) {
      await delay(500);
      let current = this.head;

      for (let i = 1; i < this.size - 1; i++) {
        if (current.nextItem) current = current.nextItem;
      }

      current.nextItem = null;
      this.size--;

      return Promise.resolve("Item removed");
    }

    return Promise.reject("Item not removed");
  }

  addByIndex(index: number, item: T) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new LinkedListNode(item);

      if (this.head === null) {
        this.head = node;
      } else {
        if (index === 0) {
          node.nextItem = this.head;
          this.head = node;
        } else {
          let current = this.head;

          for (let i = 1; i < index; i++) {
            if (current.nextItem) current = current.nextItem;
          }

          node.nextItem = current.nextItem;
          current.nextItem = node;
        }
      }

      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size - 1) {
      console.log("Enter a valid index");
      return;
    } else {
      if (this.head) {
        if (index === 0) {
          this.head = this.head.nextItem;
        } else {
          let current = this.head;

          for (let i = 1; i < index; i++) {
            if (current.nextItem) current = current.nextItem;
          }

          current.nextItem = current.nextItem?.nextItem ?? null;
        }
      }

      this.size--;
    }
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  toArray() {
    let curr = this.head;
    let res: T[] = [];

    while (curr) {
      res.push(curr.item);
      curr = curr.nextItem;
    }

    return res;
  }
}

export default new LinkedList(["0", "34", "8", "1"]);
