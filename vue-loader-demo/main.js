import Vue from 'vue';

import App from './components/App.vue'
import './components/customInputInit'

new Vue({
    // template: `
    // <div>
    //     <div>Hello {{message}}</div>
    //     <input-awesome :config="config"></input-awesome>
    // </div>
    // `,
    el: "#app",
    data: {
        message: "World",
        config: {
            type: 'password',
            placeholder: 'Enter Your Password!'
        }
    },
    render: h => h(App)
})