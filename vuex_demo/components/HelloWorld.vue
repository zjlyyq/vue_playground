<template>
  <div class="hello">
    {{count}}
    <br>
    {{$store.getters.doubleCount}}
    <br>
    <button @click="countAdd">addMutation</button>
    <button @click="countAddBuAction">addActions</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    countAdd() {
      this.$store.commit("increment", 3);
    },
    countAddBuAction() {
      this.$store.dispatch("increment");
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
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
