import Vue from 'vue';

Vue.component('input-awesome', {
    props: [ 'config' ],
    render(h) {
        'input',
        {
            domProps: {
                type: this.props.type
            }
        },
        this.$slots.default
    },
})