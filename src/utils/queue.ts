import { delay } from "./funcs";

class Queue<T> {
  private store: T[] = [];
  private size: number;
  private item: T;
  private tailIndex: number | null = null;
  private headIndex: number | null = null;

  constructor(size: number, item: T) {
    this.size = size;
    this.item = item;

    this._setStore(this.item);
  }

  private _setStore(item: T) {
    for (let i = 0; i < this.size; i++) {
      this.store[i] = item;
    }
  }

  async enqueue(item: T) {
    if (this.tailIndex !== null) {
      if (this.tailIndex + 1 < this.size) {
        await delay(500);
        this.store[this.tailIndex + 1] = item;
        this.tailIndex++;

        return Promise.resolve("Item added");
      }
    } else {
      await delay(500);
      this.tailIndex = 0;
      this.headIndex = 0;
      this.store[this.tailIndex] = item;

      return Promise.resolve("Item added");
    }

    return Promise.reject("Item not added");
  }
  async dequeue() {
    if (this.headIndex !== null && this.tailIndex !== null) {
      if (this.headIndex === this.tailIndex) {
        await delay(500);
        this.store[this.headIndex] = this.item;
        this.tailIndex = null;

        return Promise.resolve("Item removed");
      } else if (this.headIndex + 1 < this.size) {
        await delay(500);
        this.store[this.headIndex] = this.item;
        this.headIndex++;

        return Promise.resolve("Item removed");
      }
    }

    return Promise.reject("Item not removed");
  }
  peek() {
    if (this.headIndex) return this.store[this.headIndex];
  }
  clear() {
    this._setStore(this.item);
    this.tailIndex = null;
    this.headIndex = null;
  }
  elements() {
    return this.store;
  }
  head() {
    return this.headIndex;
  }
  tail() {
    return this.tailIndex;
  }
}

export default new Queue(7, "");
