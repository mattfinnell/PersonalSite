/* jshint esversion : 6 */

const path = require("path");

const webpack = require("webpack");

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCssPlugin = new ExtractTextPlugin({
    filename : 'style.css'
});

const PostCssLoader = {
    loader : "postcss-loader",
    options : {
        plugins : loader => [
            require("autoprefixer")()
        ],
        sourceMap : true
    }
};

const SassLoader = {
    loader : "sass-loader",
    options : {
        outputStyle : "expanded"
    }
};

const CssLoader = {
    loader : "css-loader"
};

const ScssRule = {
    test : /\.scss$/,
    use : extractCssPlugin.extract({
        use : [
            CssLoader,
            PostCssLoader,
            SassLoader
        ]
    })
};

const FileRule = {
    test : /\.(png|jpg)$/,
    loader : "file-loader"
};

module.exports = {
    entry : {
        app : "./website/static/js/script.js",
    },
    output : {
        path : path.resolve(__dirname, '/dist'),
        publicPath : path.resolve(__dirname, '/dist'),
        filename : "[name].bundle.js"
    },
    module : {
        rules : [
            ScssRule,
            FileRule,
        ]
    },
    plugins : [
        extractCssPlugin,
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery'
        })
    ]
};
