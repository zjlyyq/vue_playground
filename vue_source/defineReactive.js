/**
 * defineReactive 用来对Object.defineProperty 进行封装
 * @param {Object} data 
 * @param {string} key 
 * @param {any} val 
 */
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
    }
  })
}