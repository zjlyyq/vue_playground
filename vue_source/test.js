let obj = {};

Object.defineProperty(obj, 'sayName', {
  enumerable: true,
  configurable: true,
  writable: true,
  value(name) {
    return 'Hi, ' + name;
  }
})


console.log(obj.sayName, obj.sayName('Tony'));

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
      console.log('methods:', method);
      return arrayProto[method].call(this, ...args);
    }
  })
})

arrayMethods.push('aaa')

