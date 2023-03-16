const Dep = require('./Dep');
/**
 * defineReactive 用来对Object.defineProperty 进行封装
 * @param {Object} data 
 * @param {string} key 
 * @param {any} val 
 */
function defineReactive(data, key, val) {
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend();
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      dep.notify();
      val = newVal;
    }
  })
}