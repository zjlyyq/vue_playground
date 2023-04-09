let count = 0;
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.id = count ++;
    this.vm = vm;
    // 执行this.getter()，就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn);
    this.value = this.get();
    debugger
    this.cb = cb;
  }

  get() {
    window.target = this;
    const value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldVal = this.value;
    this.value = this.getter(this.vm, this.vm);
    this.cb.call(this.vm, this.value, oldVal);
  }
}

/**
 * 解析简单路径
 * @param {} expOrFn 
 */
const bailRE = /[^\w.$]/
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}