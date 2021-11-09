<template lang="pug">
div
  nut-noticebar(
    text="多视频拼接步骤：1. 按顺序添加视频上传视频 2. 输入导出文件名 3. 点击拼接按钮 4. 下载按钮可用后说明视频已经拼接完毕"
  )
  //- h2 多视频合并
  div
    input(type="file", multiple, @change="upload")
  .error(v-if="errorText") {{ errorText }}
  video-preview(:videos="videos")
  div(style="padding: 20px 0")
    nut-button(type="info", :disabled="videos.length === 0", @click="handle") 拼接
    nut-button(type="success", :disabled="!finished", @click="download") 下载

  nut-progress.marginTop10(
    :percentage="progressNum",
    :showText="false",
    stroke-width="12"
  )

  //- 视频中截取区间制作gif
  nut-noticebar(text="视频中截取区间制作gif")
  div
    input(type="file", @change="upload2")
  .error(v-if="errorText2") {{ errorText2 }}
  video-preview(:videos="sourceVideo")
  nut-cell(title="请选择视频起始时间点" :desc="currenttime" @click="open")
  nut-cell(title="请输入gif时长" )
    template(v-slot:link)
      input(v-model="gifDuration")
  nut-picker(
    v-model:visible="show"
    :list-data="listData"
    title="时间选择"
    @confirm="confirm"
    @close="close"
  )
  div(style="padding: 20px 0")
    nut-button(type="info", :disabled="sourceVideo === ''", @click="handleGif") 制作GIF
    nut-button(type="success", :disabled="!finished2", @click="downloadGif") 下载
</template>

<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      sourceVideo: [],
      gifInfo: {
        startTime: '00:00:00',
        duration: 5
      },
      videos: [],
      gifURL: '',
      finished: false,
      finished2: false,
      errorText: "",
      errorText2: "",
      progressNum: 20,
    };
  },
  methods: {
    upload(e) {
      const files = e.target.files;
      this.videos = [];
      for (let file of files) {
        this.videos.push(file);
      }
    },

    upload2(e) {
      const files = e.target.files;
      this.sourceVideo = [];
      for (let file of files) {
        this.sourceVideo.push(file);
      }
    },

    handle() {
      const form = new FormData();
      for (let i = 1; i <= this.videos.length; i++) {
        form.append("video-" + i, this.videos[i - 1]);
      }
      const xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:3333/handleVideo");
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          this.errorText = "";
          this.finished = true;
         
        } else {
          this.errorText = JSON.parse(xhr.responseText).errorText.split("\n")[0];
          console.log(this.errorText);
        }
      };
      //   xhr.upload.onprogress = (e) => {
      //       console.log(e.loaded, e.total);
      //   }
      xhr.send(form);
    },

    download() {
      location.href = "http://localhost:3333/download";
    },

    handleGif() {
      const form = new FormData();
      form.append("source", this.sourceVideo[0]);
      form.append("startTime", this.currenttime);
      form.append("duration", this.gifDuration);
      const xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:3333/handleVideoToGif");
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          this.errorText2 = "";
          this.finished2 = true;
          this.gifURL = xhr.responseText;
          console.log(this.gifURL);
        } else {
          this.errorText2 = JSON.parse(xhr.responseText).errorText.split("\n")[0];
          console.log(this.errorText2);
        }
      };
      xhr.send(form);
    },

    downloadGif() {
      location.href = "http://localhost:3333/downloadGif?filepath=" + this.gifURL;
    }
  },
  created() {
    console.log(this.listData)
  },
  setup() {
    const show = ref(false);
    const numbers = [];
    const currenttime = ref('00:00');
    const gifDuration = ref(5);
    for(let i = 0;i < 60;i ++) numbers.push(i);
    return {
      listData: [
        {
          values: numbers,
          defaultIndex: 0
        },
        {
          values: numbers,
          defaultIndex: 0
        }
      ],
      open: () => {
        show.value = true;
      },
      confirm(val) {
        val.forEach((element, index) => {
          console.log(element, index)
          if (element < 10) {
            val[index] = '0' + element;
          }
        });
        currenttime.value = val.join(':')
      },
      show,
      currenttime,
      gifDuration
    }
  }
};
</script>

<style scoped lang="scss">
.nut-button {
  margin: 0 10px;
}
.error {
  color: red;
  margin: 10px 0 0 0;
}
</style>
