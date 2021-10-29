const mathodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reserve'];
const arrayProto = Array.prototype;
export const arrayMeyhods = Object.create(arrayProto);

mathodsToPatch.forEach(function (method) {
  // 缓存原始方法
  const original = arrayProto[method];
  Object.defineProperty(arrayMeyhods, method, {
    value: function mutator(...args) {
        const result = original.call(this, ...args);
        const ob = this.__ob__;
        let inserted;
        console.log('args', args);
        switch(method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
        }
        if (inserted) ob.observeArray(inserted);
        ob.dep.notify();
        return result;
    },
    configurable: true,
    enumerable: false,
    writable: true
  })
})