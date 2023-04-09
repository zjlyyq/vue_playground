
/**
 * Dep 类: 专门用于依赖收集
 */
let count = 0;
export default class Dep {
  constructor() {
    this.id = count ++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    this.subs = this.subs.filter(item => item != sub);
  }

  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}