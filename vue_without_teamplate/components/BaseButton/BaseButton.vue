<template>
    <div>
        <label></label>
        <input type="submit" v-model="value" />
    </div>
</template>

<script>
    export default {
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
</script>








// baseButton = {
//     template: `
//     <div>
//         <label></label>
//         <input type="submit" v-model="value"></input>
//     </div>
//     `,
//     data() {
//         return {
//             message1: '这是一个to-do item待办项'
//         }
//     },
//     props: {
//         value: {
//             type: String,
//             default: ''
//         }
//     }
// }