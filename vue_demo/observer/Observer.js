import Dep from "./Dep.js";
import { arrayMeyhods } from './array.js';
import { def } from '../utils/index.js'
/** 
 * Observer类会附加到每一个被侦测的object上。 
 * 一旦被附加上，Observer会将object的所有属性转换为getter/setter的形式 
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖 
 */
// __proto__ 是否可用
const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMeyhods);
export default class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);  
    } else {
      if (hasProto)
        value.__proto__ = arrayMeyhods;
      else 
        copyAugment(value, arrayMeyhods, arrayKeys);
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
      // 在这里收集数组依赖
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}

function copyAugment(target, src, keys) {
  for (let key of keys) {
    def(target, key, src[key]);
  }
}