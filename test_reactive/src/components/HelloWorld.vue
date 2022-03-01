<template>
  <div class="hello">
    value: {{ macType }}
    <button @click="macType++">add</button>
    <p v-for="(item, i) in meshList" :key="i" @click="selectNode(item.devSerial)">{{ item.devSerial }}</p>
    <h6>选中个数{{selectedInfo.selectedList.length}}</h6>
    <input type="text" :value="value" @input="log"/>
  </div>
</template>

<script>
import { ref, isRef, reactive } from "vue";
export default {
  name: "HelloWorld",
  methods: {
    log() {
       console.log('input');
    }
  },
  data() {
    return {
      value: 'x',
      meshList: [
        {
          devSerial: "W3Z(1123456789)",
        },
        {
          devSerial: "W3Z(1213456789)",
        },
        {
          devSerial: "W3Z(1231456789)"
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  setup() {
    const macType = ref(0); // 0 手动 1 现有
    console.log(isRef(macType));
    let selectedInfo = reactive({
      selectedList: []
    });
    const selectNode = (devSerial) => {
      const {selectedList} = selectedInfo;
      if (!selectedList.includes(devSerial)) {
        selectedList.push(devSerial);
      } else {
        selectedInfo.selectedList = selectedList.filter((item) => item != devSerial);
      }
    };
    return {
      macType,
      selectedInfo,
      selectNode,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
