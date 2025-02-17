var path = require("path");
var webpack = require("webpack");

var app_dir = __dirname + '/client';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: app_dir + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

var config = {
    entry: app_dir + '/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            options: { babelrcRoots: ['.', '../'] }
        }]
    },
    // resolve: {
    //     alias: {
    //       GoldenLayout: path.resolve(__dirname, '../')
    //     }
    // },
    plugins: [HTMLWebpackPluginConfig,
        new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery'
         })
    ]
};
module.exports = config;
