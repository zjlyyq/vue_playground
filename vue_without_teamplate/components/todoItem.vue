
<template >
    <div>
        {{message1 + ': '}}{{context}}
        <p>截止时间:{{publishDate}}</p>
    </div>
</template>

<script>
export default {
//   name: "todoItem",
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
  }
};
</script>

