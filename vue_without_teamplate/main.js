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
const app = new Vue({
    el: "#app",
    data: {
        message: "hello vue!",
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
        ]
    }
})

const app2 = new Vue({
    el: "#todo",
    data: {
        message: "Another Vue!",
    }
})