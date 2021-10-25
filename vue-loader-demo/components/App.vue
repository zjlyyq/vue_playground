<template>
    <div>
        <!-- <base-button value="提交" label="label:"></base-button> -->
        <base-64-transformer></base-64-transformer>
        <input-awesome :config="config" @change="inputChanged">
            <button>submit</button>
        </input-awesome>
        <br>
        <custom-input :config="config2">
            <button>submit</button>
        </custom-input>
        <br>
        <functional-input :config="config3" data-name="functional-component" data-class="functional" a="a">
        
        </functional-input>
        <functional-input :config="config3" data-name="functional-component" data-class="functional" a="a">
            <button>submit</button>
        </functional-input>
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
    components: { BaseButton, Base64Transformer },
    data() {
        return {
            config: {
                type: 'text',
                placeholder: 'Enter Your Name...',
                value: '123456'
            },
            config2: {
                type: 'number',
                placeholder: 'Enter Your Age...',
                value: '123456'
            },
            config3: {
                type: 'password',
                placeholder: 'Enter Your password...',
                value: '123456'
            }
        }
    },
    methods: {
        inputChanged(v) {
            this.config.value = v;
        }
    }
}
</script>
