import Dep from "./Dep.js";
export default function defineReavtive(data, key, val) {
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`收集${key}依赖`);
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}
