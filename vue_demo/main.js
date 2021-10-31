// import defineReactive from "./reactive.js";
import Observer from "./observer/Observer.js";
import Watcher from "./observer/watcher.js";
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

const vm = new Vue({data});
vm.$watch('info', (newval) => {
  console.log('$watched', newval);
}, { deep: true, immediate: true})

// export default class Main {
//   constructor() {
//     this.value = 0;
//   }

//   get() {
//     console.log("get clalled");
//     return this.value;
//   }
// }
