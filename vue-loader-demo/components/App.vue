<template>
    <div>
        Hello, {{msg}}
    </div>
</template>


<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })

export default {
    name: "App",
    data() {
        return {
            msg: "World"
        }
    }
}
</script>
