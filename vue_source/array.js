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
  // 缓存原始方法
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    enumerable: true,
    configurable: false,
    value: function mutator(...args) {
      const ob = this.__ob__ // 新增
      const result = original.apply(this, args)
      if (method === 'push' || method === 'unshift') {
        ob.observeArray(args);
      }
      // console.log(result)
      ob.dep.notify();  // 向依赖发送消息
      return result;
    }
  })
})
export { arrayMethods };