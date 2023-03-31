const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
// 七个改变原数组的方法
[
  'push', 
  'pop', 
  'shift', 
  'unshift', 
  'splice', 
  'sort', 
  'reverse'
].forEach(method => {
  Object.defineProperty(arrayMethods, method, {
    enumerable: true,
    configurable: false,
    value: function mutator(...args) {
      return arrayProto[method].call(this, ...args);
    }
  })
})
export { arrayMethods };