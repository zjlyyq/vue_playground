import Vue from 'vue';

import App from './components/App.vue'

new Vue({
    // template: `<div>Hello {{message}}</div>`,
    el: "#app",
    // data: {
    //     message: "World"
    // },
    render: h => h(App)
})