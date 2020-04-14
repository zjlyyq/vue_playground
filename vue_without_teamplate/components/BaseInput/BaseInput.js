baseInput = {
    template: `
    <div>
        <label>{{label}}</label>
        <input type="text" v-model="value"></input>
    </div>
    `,
    data() {
        return {
            message1: '这是一个to-do item待办项'
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        label: String
    }
}