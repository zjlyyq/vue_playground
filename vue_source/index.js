import Observer from './Observer.js';
import Watcher from './Watcher.js';

const data  = {
    name: 'zhang san',
    age: 12
};
// console.log(defineReactive);
new Observer(data);

const watch = new Watcher(data, 'name', (newVal, oldVal) => {
    console.log(newVal, oldVal);
})

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