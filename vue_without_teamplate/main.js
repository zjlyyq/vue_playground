const Vue = require('vue');
// const todoItem = require('./components/todoItem');
import TodoItem from './components/todoItem';
// var todoItem = require('todo-item');
// Vue.component( 'todo-item',{
//     // el: "#todo",
//     template: `
//     <div>
//         {{message1 + ': '}}{{context}}
//         <p>截止时间:{{publishDate}}</p>

//     </div>
//     `,
//     data() {
//         return {
//             message1: '这是一个to-do item待办项'
//         }
//     },
//     props: {
//         'context': {
//             type: String,
//             default: ""
//         },
//         "publishDate": {
//             type: String,
//             default: new Date().toLocaleDateString()
//         }
//     }
// })
// Vue.component('todo-item', function (resolve, rejected) {
//     resolve({
//         // el: "#todo",
//         template: `
//         <div>
//             {{message1 + ': '}}{{context}}
//             <p>截止时间:{{publishDate}}</p>
    
//         </div>
//         `,
//         data() {
//             return {
//                 message1: '这是一个to-do item待办项'
//             }
//         },
//         props: {
//             'context': {
//                 type: String,
//                 default: ""
//             },
//             "publishDate": {
//                 type: String,
//                 default: new Date().toLocaleDateString()
//             }
//         }
//     })
// })
// const vm = new Vue({
//     el: "#app",
//     data: {
//         message: "hello vue!",
//         test: 'test',
//         creatingTime: '页面加载于 ' + new Date().toLocaleString(),
//         todoList: [
//             {
//                 id:1,
//                 context:'读书',
//                 date: '2020/03/29'
//             },
//             {
//                 id: 2,
//                 context: '写字',
//                 date: '2020/03/21'
//             },
//             {
//                 id: 3,
//                 context: '敲代码',
//                 date: '2020/03/21'
//             }
//         ],
//         showInfo: false,
//         showList: [
//             {
//                 id:1,
//                 context:'读书',
//                 date: '2020/03/29',
//                 showFlag: true
//             },
//             {
//                 id: 2,
//                 context: '写字',
//                 date: '2020/03/21',
//                 showFlag: false
//             },
//             {
//                 id: 3,
//                 context: '敲代码',
//                 date: '2020/03/21',
//                 showFlag: true
//             }
//         ]
//     },
//     components:{
//         "itdoItem": todoItem
//     },
//     computed: {
//         // 计算属性的 getter
//         reversedMessage: function() {
//             console.log('reversedMessage called');
//             // `this` 指向 vm 实例
//             return this.message.split(' ').reverse().join('');
//         }
//     },
//     methods: {
//         reversedMessageFunc() {
//             console.log('reversedMessageFunc called');
//             return this.message.split(' ').reverse().join('');
//         },
//         changeMessage() {
//             console.log('changeMessage called');
//             this.message += ' zjl';
//         },
//         testFun(){
//             this.test += ' test';
//             console.log('test called');
//         }
//     },
// })

// const app2 = new Vue({
//     el: "#todo",
//     data: {
//         message: "Another Vue!",
//     }
// })

// console.log(vm.showList);
// setTimeout(()=>{
//     vm.todoList = vm.todoList.filter(function(item){
//         return item.id > 1;
//     })
// },3000)