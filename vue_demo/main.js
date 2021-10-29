// import defineReactive from "./reactive.js";
import Observer from "./observer/Observer.js";
import Watcher from "./observer/watcher.js";
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
new Observer(data);
// new Watcher(data, "count", (newVal, oldVal) => {
//   console.log(`new = ${newVal}, old = ${oldVal}`);
// });
new Watcher(data, "info.me", (newVal, oldVal) => {
  console.log(`new = ${newVal}, old = ${JSON.stringify(oldVal)}`);
});
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


// export default class Main {
//   constructor() {
//     this.value = 0;
//   }

//   get() {
//     console.log("get clalled");
//     return this.value;
//   }
// }
