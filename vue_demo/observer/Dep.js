let uid = 0;
export default class Dep {
  constructor() {
    this.subs = [];
    this.id = uid ++;
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (window.target) {
      window.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

function remove(arr, item) {
  for(let it of arr) {
    if (it === item) {
      
    }
  }
}
