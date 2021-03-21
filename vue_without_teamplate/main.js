const Vue = require('vue');
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
// const todoItem = require('./components/todoItem');
// import todoItem from './components/todoItem';
// var todoItem = require('todo-item');

// 局部注册，组件选项对象
var todoItem = {
    template: `
    <div>
        {{message1 + ': '}}{{context}}
        <p>截止时间:{{publishDate}}</p>

    </div>
    `,
    data() {
        return {
            message1: '这是一个to-do item待办项'
        }
    },
    props: {
        'context': {
            type: String,
            default: ""
        },
        "publishDate": {
            type: String,
            default: new Date().toLocaleDateString()
        }
    }
}

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
const requireComponent = require.context('./components', true, /Base[A-Z]\w+\.(vue|js)$/);
console.log('requireComponent', requireComponent);
console.log('requireComponent', requireComponent.keys());

requireComponent.keys().forEach(fileName => {
    console.log(fileName);
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    console.log(componentConfig);
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 获取和目录深度无关的文件名
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    )
    Vue.component(componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig);
    console.log(componentName);
});
const vm = new Vue({
    el: "#app",
    data: {
        submit: '登录',
        message: "hello vue!",
        test: 'test',
        creatingTime: '页面加载于 ' + new Date().toLocaleString(),
        todoList: [
            {
                id: 1,
                context: '读书',
                date: '2020/03/29'
            },
            {
                id: 2,
                context: '写字',
                date: '2020/03/21'
            },
            {
                id: 3,
                context: '敲代码',
                date: '2020/03/21'
            }
        ],
        showInfo: false,
        showList: [
            {
                id: 1,
                context: '读书',
                date: '2020/03/29',
                showFlag: true
            },
            {
                id: 2,
                context: '写字',
                date: '2020/03/21',
                showFlag: false
            },
            {
                id: 3,
                context: '敲代码',
                date: '2020/03/21',
                showFlag: true
            }
        ]
    },
    components: {
        "todoItem": todoItem
    },
    computed: {
        // 计算属性的 getter
        reversedMessage: function () {
            console.log('reversedMessage called');
            // `this` 指向 vm 实例
            return this.message.split(' ').reverse().join('');
        },
        // 测试计算属性对于列表长度的反应
        computeList() {
            let o = JSON.parse(JSON.stringify(this.showList))
            o.map(e => e.context = '我就喜欢：' + e.context);
            return o
        }
    },
    methods: {
        addItem() {
            this.showList.push({
                id: 4,
                context: '打LOL',
                date: '2021/03/21'
            })
        },
        reversedMessageFunc() {
            console.log('reversedMessageFunc called');
            return this.message.split(' ').reverse().join('');
        },
        changeMessage() {
            console.log('changeMessage called');
            this.message += ' zjl';
        },
        testFun() {
            this.test += ' test';
            console.log('test called');
        }
    },
})

const app2 = new Vue({
    el: "#todo",
    data: {
        message: "Another Vue!",
    }
})

console.log(vm.showList);
setTimeout(() => {
    vm.todoList = vm.todoList.filter(function (item) {
        return item.id > 1;
    })
}, 3000)