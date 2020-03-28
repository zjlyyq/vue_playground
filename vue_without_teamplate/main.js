const Vue = require('vue');

Vue.component( 'todo-item',{
    // el: "#todo",
    template: '<li>这是一个to-do item待办项</li>',
    data: {
        message: '这是一个to-do item待办项'
    },
})
const app = new Vue({
    el: "#app",
    data: {
        message: "hello vue!",
        creatingTime: '页面加载于 ' + new Date().toLocaleString()
    }
})
