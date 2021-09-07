<template>
    <div>
        Hello, {{msg}}
        <!-- <input-awesome :config="config"></input-awesome> -->
    </div>
</template>


<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
    //     setup() {
        
        //     },
// })
import './components/PasswordInput';

export default {
    name: "App",
    data() {
        return {
            msg: "World",
            config: {
                type: 'password',
                palceholder: '原密码'
            }
        }
    }
}
</script>
