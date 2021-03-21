
<template>
    <div>
        {{message1 + ': '}}{{context}}
        <p>截止时间:{{publishDate}}</p>
        <p>{{getMonth(12)}}</p>
    </div>
</template>

<script>
const getMonthString = require('../../../lib/dataFormat.js');
// import getMonthString from '../../../lib/dataFormat.js';
export default {
  data() {
    return {
      message1: "这是一个to-do item待办项"
    };
  },
  props: {
    context: {
      type: String,
      default: ""
    },
    publishDate: {
      type: String,
      default: new Date().toLocaleDateString()
    }
  },
  methods: {
    getMonth(month) {
      return getMonthString(month);
    }
  }
};
</script>

<style scoped>

</style>