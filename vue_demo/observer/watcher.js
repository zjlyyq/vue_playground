import parsePath from "./parsePath.js";
import { traverse } from './traverse.js';
// Watcher 实例可以主动将自己添加到属性的Dep中去。
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    if (options) {
      this.deep = !!options.deep
    } else {
      this.deep = false;
    }
    this.deps = [];
    this.depIds = new Set();
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      // 执行 this.getter(), 就可以读取data.a.b.c 的内容
      this.getter = parsePath(expOrFn);
    }
    this.cb = cb;
    this.value = this.get();
    // console.log(`${expOrFn}: ${this.value}`);
    // console.log(vm);
  }

  get() {
    window.target = this;
    // 读一下data.a.b.c的值，收集依赖
    let value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    // console.log('oldValue = ', JSON.stringify(oldValue))
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }

  // 通知dep添加自己
  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.depIds.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  // 通知Dep移除本watcher
  teardown() {
    for(let dep of this.deps) {
      dep.removeSub(this);
    }
  }
}
