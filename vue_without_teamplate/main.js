const Vue = require('vue');

Vue.component( 'todo-item',{
    // el: "#todo",
    template: `
    <div>
        {{message1 + ': '}}{{context}}
        <p>截止时间:{{date}}</p>

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
        "date": {
            type: String,
            default: new Date().toLocaleDateString()
        }
    }
})
const vm = new Vue({
    el: "#app",
    data: {
        message: "hello vue!",
        test: 'test',
        creatingTime: '页面加载于 ' + new Date().toLocaleString(),
        todoList: [
            {
                id:1,
                context:'读书',
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
                id:1,
                context:'读书',
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
    computed: {
        // 计算属性的 getter
        reversedMessage: function() {
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
        testFun(){
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
setTimeout(()=>{
    vm.todoList = vm.todoList.filter(function(item){
        return item.id > 1;
    })
},3000)