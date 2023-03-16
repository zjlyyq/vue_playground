/**
 * defineReactive 用来对Object.defineProperty 进行封装
 * @param {Object} data 
 * @param {string} key 
 * @param {any} val 
 */
function defineReactive(data, key, val) {
  let dep = []; // 数组用于收集依赖
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.push(window.target);
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      // 循环dep 以触发收集到的依赖。
      for(let i = 0;i < dep.length; i++) {
        dep[i](newVal. val);
      }
      val = newVal;
    }
  })
}