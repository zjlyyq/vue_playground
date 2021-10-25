import { createApp } from "vue";
import router from './router';
import { Button, Icon, Collapse,CollapseItem } from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";

const app = createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
    <router-view />
  `
})

app.component('parent-component', {
  template: `
    <h2>This is a parent component</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
app.use(Button).use(Icon).use(Collapse).use(CollapseItem);
app.use(router);
app.mount("#app");
