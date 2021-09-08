<template>
    <div>
        <!-- <base-button value="提交" label="label:"></base-button> -->
        <base-64-transformer></base-64-transformer>
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

export default {
    name: "App",
    components: { BaseButton, Base64Transformer}
}
</script>
