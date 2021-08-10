const path = require('path');
module.exports = {
    mode: "development",

    entry: {
        app: './main.js'
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            // ... 其它规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: 'index.html',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        },
        // extensions: ['*', '.js', '.vue']
    }
}