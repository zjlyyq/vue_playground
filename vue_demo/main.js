// import defineReactive from "./reactive.js";
import Observer from "./observer/Observer.js";
import Watcher from "./observer/watcher.js";
import { set, del } from './observer/index.js';
window._watch = Watcher;
let data = {
  count: 0,
  info: {
    me:  {
      name: { name: 'zjl' }
    }
  },
  list: [{x: 10, y: 12}, 2, 3, 4]
};
// defineReactive(data, "count", 0);
// console.log(data.count);
// new Observer(data);
// new Watcher(data, "count", (newVal, oldVal) => {
//   console.log(`new = ${newVal}, old = ${oldVal}`);
// });
// new Watcher(data, "info.me", (newVal, oldVal) => {
//   console.log(`new = ${newVal}, old = ${JSON.stringify(oldVal)}`);
// });
// new Watcher(data, "list", (newVal, oldVal) => {
//   console.log(`new = ${newVal}, old = ${oldVal}`);
// });

// new Watcher(data, "list.0.x", (newVal, oldVal) => {
//   console.log(`new = ${JSON.stringify(newVal)}, old = ${ JSON.stringify(oldVal)}`);
// });

// setInterval(() => {
//   data.count += 1;
// }, 1500)

window._data = data;

function Vue(options) {
  Object.assign(this, options.data);
  new Observer(this);
}

Vue.prototype.$watch = function(expOrFn, callback, options) {
  const vm = this;
  const optiosn = options || {};
  const watcher = new Watcher(vm, expOrFn, callback, optiosn);

  if (options.immediate) {
    console.log('immediate called');
    callback.call(vm, watcher.value);
  }

  return function unwatchFn() {
    watcher.teardown();
  }
}

Vue.prototype.$set = set;
Vue.prototype.$delete = del;
const vm = new Vue({data});
window._vm = vm;
vm.$watch('info', (newval) => {
  console.log('$watched info', newval);
}, { deep: true, immediate: true})
vm.$set(vm.info, 'age', 25);
vm.$watch('info.age', (newval) => {
  console.log('$watched info.age', newval);
}, { deep: true, immediate: true})
// vm.$delete(vm.info, 'age');
// export default class Main {
//   constructor() {
//     this.value = 0;
//   }

//   get() {
//     console.log("get clalled");
//     return this.value;
//   }
// }
