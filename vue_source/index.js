import defineReactive from './defineReactive.js';
import Watcher from './Watcher.js';

const data  = {};
defineReactive(data, 'name', 'zjl')
// console.log(defineReactive);

const watch = new Watcher(data, 'name', (newVal, oldVal) => {
    console.log(newVal, oldVal);
})

setTimeout(() => {
    data.name = 'wyl';
}, 3000);

setTimeout(() => {
    data.name = 'yyq';
}, 4000);