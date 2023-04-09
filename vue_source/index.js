import Observer from './Observer.js';
import Watcher from './Watcher.js';

const data  = {
    name: 'zhang san',
    age: 12,
    person: {
        class: {
            id: 1
        }
    },
    list: [1, 2, {name: 'xxx'}, 3]
};
// console.log(defineReactive);
// 递归侦听data对象
new Observer(data);
// console.log(data.person);
// 侦听data.name属性
const watch = new Watcher(data, 'name', (newVal, oldVal) => {
    console.log('name:', newVal, oldVal);
})

// // 侦听data.age属性
// new Watcher(data, 'age', (newVal, oldVal) => {
//     console.log('age:', newVal, oldVal);
// })

// 侦听data.person属性
new Watcher(data, 'person', (newVal, oldVal) => {
    console.log('person:', newVal, oldVal);
})

console.log(data.person);
data.person = {};

// 侦测数组的变化
new Watcher(data, 'list', (newVal, oldVal) => {
    console.log('list:', newVal, JSON.stringify(oldVal));
})

data.list.push(4);
data.list.push(5);

// 侦测数组元素的变化
new Watcher(data.list[2], 'name', (newVal, oldVal) => {
    console.log('list[2].name:', newVal, JSON.stringify(oldVal));
})

data.list[2].name = 'zhangjialu';
data.list.push({id: 1});
// 侦测数组新增元素的变化
new Watcher(data.list[6], 'id', (newVal, oldVal) => {
    console.log('list[6].id:', newVal, JSON.stringify(oldVal));
})
data.list[6].id += 1;

setTimeout(() => {
    data.name = 'wyl';
}, 3000);

// setTimeout(() => {
//     data.name = 'yyq';
//     data.age += 1;
//     console.log('change id')
//     data.class.id = 2;
// }, 4000);

// const list = ['a', 'b', 'c', [1, 2, 3]];
// // 尝试侦听数组
// new Observer(list);
// new Watcher(list, '0', (newVal, oldVal) => {
//     console.log('list[0] =', newVal);
// })
// new Watcher(list, '3', (newVal, oldVal) => {
//     console.log('list[3] =', newVal);
// })
// setTimeout(() => {
//    list[0] += 'a';
// }, 1000);
// setTimeout(() => {
//     list[0] += 'a';
//     list[3] = [4, 5, 6];
//  }, 2000);

window.data = data;