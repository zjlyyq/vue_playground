import Dep from "./Dep.js";
/** 
 * Observer类会附加到每一个被侦测的object上。 
 * 一旦被附加上，Observer会将object的所有属性转换为getter/setter的形式 
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖 
 */
export default class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);  
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for(let key of keys) {
      defineReavtive(obj, key, obj[key]);
    }
  }
}

function defineReavtive(data, key, val) {
  if (typeof val === 'object') {
    new Observer(val);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}