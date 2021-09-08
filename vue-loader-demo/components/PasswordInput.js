import Vue from 'vue';

Vue.component('input-awesome', {
    props: ['config'],
    render: function(h) {
        let self = this;
        h(
            'input', {
                domProps: {
                    type: 'password',
                    placeholder: 'self.config.placeholder'
                }
            },
            this.$slots.default
        )
    },
    beforeCreated() {
        console.log('beforeCreated'); 
    }
})