const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts.js');

module.exports = merge([
  {
    entry: {
      vendor: [
        'bootstrap-loader/extractStyles',
      ],
      app: path.resolve(parts.PATHS.assets, 'js', 'script.js'),
    },
    output: {
      path: path.resolve('website', 'static', 'build'),
      publicPath: '/static/build/',
      filename: 'js/[name].bundle.js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
    devServer: {
      stats: {
        children: false,
        modules: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
  parts.loadFonts({
    options: {
      publicPath: '/static/build/',
      outputPath: 'fonts/',
      name: '[name].[ext]',
    },
  }),
  parts.loadImages(),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.loadJavaScript({
    include: path.resolve(parts.PATHS.assets, 'js'),
    exclude: /node_modules/,
  }),
]);
