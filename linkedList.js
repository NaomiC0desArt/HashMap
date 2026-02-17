class Node {
  constructor(key, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.lastNode = null;
  }

  append(key, value) {
    const node = new Node(key, value);

    if (this.head === null) {
      this.head = node;
    } else {
      this.lastNode.nextNode = node;
    }
    this.lastNode = node;
  }

  contains(key) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.key == key) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }
    return false;
  }

  findIndex(key) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
      index += 1;

      if (currentNode.key == key) {
        return index;
      }
    }

    return -1;
  }

  removeAt(index) {
   
    if (index === 0) {
      this.head = this.head.nextNode;
    }

    if (index > 0) {
      let counter = 0;
      let currentNode = this.head;
      while (counter !== index - 1) {
        currentNode = currentNode.nextNode;
        counter++;
      }

      let nextNode = currentNode.nextNode;

      currentNode.nextNode = nextNode.nextNode;
    }
  }

  forEach(callback) {
    let currentNode = this.head;

    while (currentNode !== null) {
      callback(currentNode);
      currentNode = currentNode.nextNode;
    }
  }
}

export { LinkedList };
