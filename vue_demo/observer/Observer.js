import Dep from "./Dep.js";
import { arrayMeyhods } from './array.js';
import { def, isObject } from '../utils/index.js'
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
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (!Array.isArray(value)) {
      this.walk(value);  
    } else {
        this.observeArray(value);
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

  observeArray(items) {
    for(let item of items) {
        observe(item);
    }
  }
}

function defineReavtive(data, key, val) {
  let childOb = observe(val);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get', key, val, !! childOb);
      dep.depend();
      // 在这里收集数组依赖
      if (childOb) {
        childOb.dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}

/**
 * 尝试为value创建一个Observer实例，
 * 如果创建成功，直接返回新创建的Observer实例
 * 如果value已经存在一个Observer实例，则直接返回它
 */
function observe(value, asRootData) {
  if (!isObject(value)) {
      return;
  }
  let ob;
  if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
  } else {
      ob = new Observer(value);
  }
  return ob;
} 
function copyAugment(target, src, keys) {
  for (let key of keys) {
    def(target, key, src[key]);
  }
}
