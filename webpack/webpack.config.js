
/* Set this so that webpack.bootstrap.config.js knows where to look */
process.env.BOOTSTRAPRC_LOCATION = "./.bootstraprc";

const path = require("path");

const webpack = require("webpack");

const bootstrapConfig = require('./webpack.bootstrap.config.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCssPlugin = new ExtractTextPlugin({
    filename : '[name].css',
    allChunks : true
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

const ImageRule = {
    test : /\.(png|jpg)$/,
    loader : "file-loader"
};

const WoffFontRule = {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: "url-loader"
};

const OpenFontRule = {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader'
};

module.exports = {
    entry : {
        app : "./website/static/js/script.js",
        bootstrap : bootstrapConfig.dev
    },
    output : {
        path : path.resolve(__dirname, '/dist'),
        publicPath : path.resolve(__dirname, '/dist'),
        filename : "[name].bundle.js"
    },
    module : {
        rules : [
            ScssRule,
            ImageRule,
            OpenFontRule,
            WoffFontRule
        ]
    },
    plugins : [
        extractCssPlugin,
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery'
        })
    ],
    devServer : {
        stats : {
            modules : false,
            children : false
        }
    }
};
