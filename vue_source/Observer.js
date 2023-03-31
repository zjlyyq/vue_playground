import Dep from "./Dep.js";
import { arrayMethods } from './array.js';
import { def } from './utils/index';

function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

function copyAugment (target, src, keys) {
  for(let key of keys) {
    def(target, key, src[key])
  }
}
// __proto__ 是否可用
const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * Observer类会附加到每一个被侦测的object上。
 * 一旦被附加上，Observer会将object的所有属性转换为getter/setter的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
 */
class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    } else {
      // this.walk(value)
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      value.__proto__ = arrayMethods;
    }
  }

  /**
   * walk会将每一个属性都转换成getter/setter的形式来侦测变化
   * 这个方法只有在数据类型为Object时被调用
   */
  walk(obj) {
    const keys = Object.keys(obj);
    for(let key of keys) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

/**
 * defineReactive 用来对Object.defineProperty 进行封装
 * @param {Object} data 
 * @param {string} key 
 * @param {any} val 
 */
function defineReactive(data, key, val) {
  // 递归子属性
  if (typeof data[key] === 'object') {
    new Observer(data[key]);
  }
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
      val = newVal;
      dep.notify();
    }
  })
}

export default Observer;