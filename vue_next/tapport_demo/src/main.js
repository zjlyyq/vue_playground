import {
  createApp
} from "vue";
import router from './router';
import {
  Button,
  Icon,
  Collapse,
  CollapseItem,
  NoticeBar,
  Progress,
  Picker,
  Popup,
  Cell
} from "@nutui/nutui";
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
    <div style="margin-top: 20px;">Hello, {{ name }}</div>
  `
})

app.component('video-preview', {
  props: {
    videos: Array
  },  
  render() {
    console.log('videos', this.videos);
    const videos = [];
    for(let video of this.videos) {
        const url = URL.createObjectURL(video);
        console.log(url);
        videos.push(<video controls style={"width: 30%;"}> 
            <source src={url}
            type="video/mp4"></source>
            sorry, your browser doesn't support embedded videos.
        </video>);
    }
    return <div>
        { videos }
    </div>
  },
  beforeUpdate() {
      console.log(this.videos);
  }

});

{/* console.log(VideoPreview); */}
const nutuiComponents = [Button, Icon, Collapse, CollapseItem, NoticeBar, Progress, Picker, Popup, Cell];
nutuiComponents.forEach(i => app.use(i));
app.use(router);
app.mount("#app");