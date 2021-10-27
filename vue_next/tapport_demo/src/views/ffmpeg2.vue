<template lang="pug">
div
    nut-noticebar(text="多视频拼接步骤：1. 按顺序添加视频上传视频 2. 输入导出文件名 3. 点击拼接按钮 4. 下载按钮可用后说明视频已经拼接完毕")
    //- h2 多视频合并
    div
        input(type="file" multiple @change="upload")
    div.error(v-if="errorText") {{errorText}}
    video-preview(:videos="videos")
    div(style="padding: 20px 0;")
        nut-button(type="info" :disabled="videos.length === 0" @click="handle") 拼接
        nut-button(type="success" :disabled="!finished" @click="download") 下载

    nut-progress.marginTop10(:percentage="progressNum" :showText="false" stroke-width="12")

</template>

<script>
export default {
  data() {
    return {
      videos: [],
      finished: false,
      errorText: '',
      progressNum: 20
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
                  this.errorText = '';
                  this.finished = true;
              } else {
                  this.errorText = JSON.parse(xhr.responseText).errorText.split('\n')[0];
                  console.log(this.errorText);
              }
          }
        //   xhr.upload.onprogress = (e) => {
        //       console.log(e.loaded, e.total);
        //   }
          xhr.send(form);
      },

      download() {
          location.href = 'http://localhost:3333/download'
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
