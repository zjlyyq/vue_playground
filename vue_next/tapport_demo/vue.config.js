// const formidable = require('express-formidable')
const cp = require('child_process');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      },
      extensions: ['*', '.js', '.vue']
    }
  },
  devServer: {
    host: 'localhost',
    port: 9999,
    before: function (app, server, compiler) {
      // app.use(formidable());
      // app.post('/handleVideo', (req, res) => {
      //   // console.log(req);
      //   const { query, params, fields } = req;
      //   console.log(query, params, fields);
      //   res.send('finished');
      // })
      cp.exec('node ./server/index.js', err => {
        console.log(err);
      });
    }
  }
}