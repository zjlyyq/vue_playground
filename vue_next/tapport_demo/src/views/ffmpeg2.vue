<template lang="pug">
div
    nut-noticebar(text="多视频拼接步骤：1. 按顺序添加视频上传视频 2. 输入导出文件名 3. 点击拼接按钮")
    //- h2 多视频合并
    div
        input(type="file" multiple @change="upload")
    div(style="padding: 20px 0;")
        nut-button(type="info" :disabled="videos.length === 0" @click="handle") 拼接
        nut-button(type="success" :disabled="!finished" @click="download") 下载
</template>

<script>
export default {
  data() {
    return {
      videos: [],
      finished: false
    };
  },
  methods: {
      upload(e) {
          const files = e.target.files;
          this.videos = [];
          for(let file of files) {
              this.videos.push(file);
          }
      },

      handle() {
          const form = new FormData();
          for(let i = 1;i <= this.videos.length;i ++) {
              form.append('video-'+i, this.videos[i-1]);
          }
          const xhr = new XMLHttpRequest();
          xhr.open('post', 'http://localhost:3333/handleVideo');
          xhr.onreadystatechange = () =>{
              if (xhr.status === 200) {
                  this.finished = true;
              }
          }
          xhr.send(form);
      },

      download() {

      }
  }
};
</script>

<style scoped lang="scss">
    .nut-button {
        margin: 0 10px;
    }
</style>
