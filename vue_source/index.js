import Observer from './Observer.js';
import Watcher from './Watcher.js';

const data  = {
    name: 'zhang san',
    age: 12
};
// console.log(defineReactive);
// 递归侦听data对象
new Observer(data);

// 侦听data.name属性
const watch = new Watcher(data, 'name', (newVal, oldVal) => {
    console.log(newVal, oldVal);
})

// 侦听data.age属性
new Watcher(data, 'age', (newVal, oldVal) => {
    console.log(newVal, oldVal);
})

setTimeout(() => {
    data.name = 'wyl';
}, 3000);

setTimeout(() => {
    data.name = 'yyq';
    data.age += 1;
}, 4000);

const list = ['a', 'b', 'c', [1, 2, 3]];
// 尝试侦听数组
new Observer(list);
new Watcher(list, '0', (newVal, oldVal) => {
    console.log('list[0] =', newVal);
})
new Watcher(list, '3', (newVal, oldVal) => {
    console.log('list[3] =', newVal);
})
setTimeout(() => {
   list[0] += 'a';
}, 1000);
setTimeout(() => {
    list[0] += 'a';
    list[3] = [4, 5, 6];
 }, 2000);
