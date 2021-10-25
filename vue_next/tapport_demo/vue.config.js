module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      },
      extensions: ['*', '.js', '.vue']
    }
  }
}