import Vue from "vue";
import App from "./App.vue";
import vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(vuex);

const store = new vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    }
  },
  // 异步改变
  actions: {
    increment({ state }) {
      setTimeout(() => {
        state.count++;
      }, 3000);
    }
  },
  // 类似于计算属性，有缓存效果
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
});
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
