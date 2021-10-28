const mathodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reserve'];
const arrayProto = Array.prototype;
export const arrayMeyhods = Object.create(arrayProto);

mathodsToPatch.forEach(function (method) {
  // 缓存原始方法
  const original = arrayProto[method];
  Object.defineProperty(arrayMeyhods, method, {
    value: function mutator(...args) {
      return original.call(this, ...args);
    },
    configurable: true,
    enumerable: false,
    writable: true
  })
})