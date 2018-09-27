module.exports = function longestConsecutiveLength(array) {

  let maxCount = array.length > 0 ? 1 : 0;

  const nums = new Map()
  array.forEach(num => {

    if(nums.has(num))
    {
      return;
    }

    const prev = nums.get(num - 1);
    const next = nums.get(num + 1);
    if (prev) {
      prev.addCount();
      nums.set(num, prev);

      if (next) {
        prev.addCount(next.count);
        nums.set(num + 1, prev);
      }

      return;
    }

    if (next) {
      next.addCount();
      nums.set(num, next);
      return;
    }

    nums.set(num, new Node((count) => {
      if (maxCount < count) {
        maxCount = count;
      }
    }));
  });

  return maxCount;
}

class Node {
  constructor(callbackFunc){
    this._count = 1;
    this._callbackFunc = callbackFunc;
  }

  get count() {
    return this._count;
  }

  addCount(count = 1) {
    this._count += count;

    if(this._callbackFunc) {
      this._callbackFunc(this._count);
    }
  }
}