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
import './registerServiceWorker'

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
    // console.log('videos', this.videos);
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
function px2rem(px) {
  return px;
}
const PickerSlot = Picker.components['nut-picker-slot'];
// 将内联样式的px转化为rem
if (!PickerSlot.methods._setRollerStyle) {
  PickerSlot.methods._setRollerStyle = PickerSlot.methods.setRollerStyle;
  PickerSlot.methods.setRollerStyle = function setRollerStyle(index) {
    // console.log( `transform: rotate3d(1, 0, 0, ${-this.rotation *
    //   index}deg) translate3d(0, 0, ${px2rem('104')}rem);-ms-transform: rotate3d(1, 0, 0, ${-this.rotation *
    //     index}deg) translate3d(0, 0, ${px2rem('104')}rem)`)
    return `transform: rotate3d(1, 0, 0, ${-this.rotation *
      index}deg) translate3d(0, 0, ${px2rem('104')}rem);-ms-transform: rotate3d(1, 0, 0, ${-this.rotation *
        index}deg) translate3d(0, 0, ${px2rem('104')}rem)`;
  };
}
if (!PickerSlot.methods._setTransform) {
  PickerSlot.methods._setTransform = PickerSlot.methods.setTransform;
  PickerSlot.methods.setTransform = function setTransform(
    translateY = 0,
    type,
    time = 1000,
    deg
  ) {
    if (type === 'end') {
      // IE 10 +
      if (navigator.msSaveOrOpenBlob) {
        this.$refs.list.style.msTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        this.$refs.roller.style.msTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        return;
      }
      this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
      this.$refs.roller.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
    } else {
      // IE 10 +
      if (navigator.msSaveOrOpenBlob) {
        this.$refs.list.style.msTransition = ``;
        this.$refs.roller.style.msTransition = ``;
        return;
      }
      this.$refs.list.style.webkitTransition = '';
      this.$refs.roller.style.webkitTransition = '';
    }
    // IE 10 +
    if (navigator.msSaveOrOpenBlob) {
      this.$refs.roller.style.msTransform = `rotate3d(1, 0, 0, ${deg})`;
      return;
    }
    this.$refs.list.style.webkitTransform = `translate3d(0, ${px2rem(
      translateY
    )}rem, 0)`;
    this.$refs.roller.style.webkitTransform = `rotate3d(1, 0, 0, ${deg})`;
    this.$refs.roller.style.msTransform = `rotate3d(1, 0, 0, ${deg})`;
    this.scrollDistance = translateY;
  };
}
// PC端移动检测
if (!PickerSlot._mounted) {
  PickerSlot._mounted = PickerSlot.mounted;
  PickerSlot.$_myGreatMixin_scroll = false;
  PickerSlot.mounted = function() {
    console.log('PickerSlot.mounted');
    let fisrtBind = true;
    this.$nextTick(() => {
      console.log('nextTick', this.$el)
      this.modifyStatus(true);
      // 监听
      this.$el.addEventListener('touchstart', this.touchStart);
      const pickerMoverFn = e => {
        console.log('mouse move');
        if (this.$_myGreatMixin_scroll === true) {
          e = e || window.event;
          e.changedTouches = [e];
          this.touchMove(e);
        }
      }
      this.$el.addEventListener('mousedown', e => {
        console.log('mouse down', Math.random())
        e = e || window.event;
        this.$_myGreatMixin_scroll = true;
        e.changedTouches = [e];
        this.touchStart(e);
        console.log(`isFirstBind = ${fisrtBind} docuemnt = ${document}`);
        document.addEventListener('mousemove', pickerMoverFn);
        console.log('addEventListener')
        if (fisrtBind) {
          document.addEventListener('mouseup', e => {
            console.log('PickerSlot mouse up');
            document.removeEventListener('mousemove', pickerMoverFn);
            console.log('removeEventListener');
            if (this.$_myGreatMixin_scroll === true) {
              e = e || window.event;
              e.changedTouches = [e];
              this.touchEnd(e);
              this.$_myGreatMixin_scroll = false;
            }
          });
          fisrtBind = false;
        }
      });
      this.$el.addEventListener('touchmove', this.touchMove);
      this.$el.addEventListener('touchend', this.touchEnd);
    });
  };
}

if (!PickerSlot._beforeDestroy) {
  PickerSlot._beforeDestroy = PickerSlot.beforeDestroy;
  PickerSlot.beforeDestroy = function() {
    // 移除监听
    this.$el.removeEventListener('touchstart', this.touchStart);
    this.$el.removeEventListener('mousedown', e => {
      e = e || window.event;
      e.changedTouches = [e];
      this.touchStart(e);
    });
    this.$el.removeEventListener('touchmove', this.touchMove);
    this.$el.removeEventListener('mousemove', e => {
      e = e || window.event;
      e.changedTouches = [e];
      this.touchMove(e);
    });
    this.$el.removeEventListener('touchend', this.touchEnd);
    // this.$el.removeEventListener('mouseup', e => {
    //   e = e || window.event;
    //   e.changedTouches = [e];
    //   this.touchEnd(e);
    // });
    clearTimeout(this.timer);
  };
}
Picker.components['nut-picker-slot'] = PickerSlot;