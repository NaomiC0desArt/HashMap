class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  add(key) {
    this.map.set(key, null);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  keys() {
    return this.map.keys();
  }

  clear() {
    this.map.clear();
  }

  size() {
    return this.map.length();
  }
}
