class ObjectPoolMember {
  #data;

  #free = true;

  constructor(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  set data(value) {
    this.#data = value;
  }

  set free(value) {
    this.#free = value;
  }

  get free() {
    return this.#free;
  }
}

class ObjectPool {
  #poolItems;

  constructor(poolSize) {
    this.#poolItems = new Array(poolSize).fill(0);
  }

  get poolItems() {
    return this.#poolItems;
  }

  resetAllFree() {
    this.poolItems.forEach((item) => (item.free = true));
  }

  findFreePoolMember() {
    const freeItem = this.poolItems.find((item) => item.free);
    if (!freeItem) {
      this.resetAllFree();
      return this.poolItems[0];
    }

    return freeItem;
  }

  append(data) {
    for (let i = 0; i < this.poolItems.length; i++) {
      if (!this.poolItems[i]) {
        this.poolItems[i] = new ObjectPoolMember(data);
        this.poolItems[i].free = false;
        break;
      }
    }
  }
}
