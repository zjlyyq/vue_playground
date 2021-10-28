import parsePath from "./parsePath.js";

// Watcher 实例可以主动将自己添加到属性的Dep中去。
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 执行 this.getter(), 就可以读取data.a.b.c 的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
    console.log(`${expOrFn}: ${this.value}`);
    console.log(vm);
  }

  get() {
    window.target = this;
    // 读一下data.a.b.c的值，收集依赖
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
