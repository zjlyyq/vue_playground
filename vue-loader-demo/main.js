import Vue from 'vue';

// import App from './components/App.vue'

Vue.component('input-awesome', {
    props: {
        config: {
            type: Object,
            default: {}
        }
    },
    render: function(h) {
        let self = this;
        return h(
            'input', {
                domProps: {
                    type: 'password',
                    placeholder: 'self.config.placeholder'
                }
            },
            self.$slots.default
        )
    },
    created() {
        console.log('created', this); 
    }
})
const config = {
    type: 'password',
    placeholder: 'Enter Your Password!'
}

new Vue({
    template: `
    <div>
        <div>Hello {{message}}</div>
        <input-awesome :config="config"></input-awesome>
    </div>
    `,
    el: "#app",
    data: {
        message: "World"
    },
    // render: h => h(App)
})