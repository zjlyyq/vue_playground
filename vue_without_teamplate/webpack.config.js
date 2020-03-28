const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",

    entry: {
        app: './main.js'
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js'
    },

    devServer: {
        contentBase: './dist',
        hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename:'index.html',
            template:'./index.html'
        }),
        new CleanWebpackPlugin()
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    }
}