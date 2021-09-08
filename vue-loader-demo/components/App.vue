<template>
    <div>
        <!-- <base-button value="提交" label="label:"></base-button> -->
        <base-64-transformer></base-64-transformer>
        <input-awesome></input-awesome>
    </div>
</template>


<script>
import BaseButton from './BaseButton/BaseButton.vue';
import Base64Transformer from './Base64Transformer/Base64Transformer.vue'

// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
    //     setup() {
        
        //     },
// })
import './PasswordInput';

export default {
    name: "App",
    components: { BaseButton, Base64Transformer },
    data() {
        return {
            config: {
                type: 'password',
                placeholder: 'Enter Your Password!'
            }
        }
    }
}
</script>
