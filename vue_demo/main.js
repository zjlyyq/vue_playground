// import defineReactive from "./reactive.js";
import Observer from "./Observer.js";
import Watcher from "./watcher.js";
let data = {
  count: 0,
  info: {
    name: 'zjl'
  }
};
// defineReactive(data, "count", 0);
// console.log(data.count);
new Observer(data);
new Watcher(data, "count", (newVal, oldVal) => {
  console.log(`new = ${newVal}, old = ${oldVal}`);
});
new Watcher(data, "info.name", (newVal, oldVal) => {
  console.log(`new = ${newVal}, old = ${oldVal}`);
});

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
