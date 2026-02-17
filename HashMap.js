import { LinkedList } from "./linkedList.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.size = 0;
    this.table = new Array(this.capacity);
  }

  hash(key, capacity = this.capacity) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  _insertNode(key, value, table = this.table) {
    const index = this.hash(key);

    if (index < 0 || index >= table.length) {
      throw new Error("Index out of bounds");
    }

    if (table[index] === undefined) {
      table[index] = new LinkedList();
    }

    if (table[index].contains(key)) {
      let currentNode = table[index].head;

      while (currentNode !== null) {
        if (currentNode.key === key) {
          currentNode.value = value;
        }

        currentNode = currentNode.nextNode;
      }
      return false;
    } else {
      table[index].append(key, value);
      return true;
    }
  }

  resize() {
    this.capacity = this.capacity * 2;
    let newTable = new Array(this.capacity);

    this.table.forEach((bucket) => {
      if (bucket !== undefined) {
        bucket.forEach((node) => {
          this._insertNode(node.key, node.value, newTable);
        });
      }
    });

    this.table = newTable;
  }

  set(key, value) {
    let insertNode = this._insertNode(key, value);
    if (insertNode) {
      this.size++;
    }

    if (this.length() > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);

    if (this.table[index].contains(key)) {
      let currentNode = this.table[index].head;

      while (currentNode !== null) {
        if (currentNode.key === key) {
          return currentNode.value;
        }

        currentNode = currentNode.nextNode;
      }

      return null;
    }
  }

  has(key) {
    const index = this.hash(key);

    return this.table[index].contains(key);
  }

  remove(key) {
    if (this.has(key)) {
      let current = this.table[this.hash(key)];

      let index = current.findIndex(key);

      if (index < 0)
        throw new RangeError("Index has to be greater or equal to 0.");

      current.removeAt(index);
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.size = 0;

    this.table = new Array(this.capacity);
  }

  keys() {
    let result = [];

    for (let bucket of this.table) {
      if (bucket !== undefined) {
        bucket.forEach((node) => result.push(node.key));
      }
    }
    return result;
  }

  values() {
    let result = [];

    for (let bucket of this.table) {
      if (bucket !== undefined) {
        bucket.forEach((node) => result.push(node.value));
      }
    }

    return result;
  }

  entries() {
    let result = [];

    for (let bucket of this.table) {
      if (bucket !== undefined) {
        bucket.forEach((node) => result.push([node.key, node.value]));
      }
    }

    return result;
  }
}

export { HashMap };
