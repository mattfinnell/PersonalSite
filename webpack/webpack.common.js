const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts.js');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = merge([
  {
    entry: {
      vendor: [
        'bootstrap-loader/extractStyles',
      ],
      app: path.resolve(parts.PATHS.assets, 'js', 'script.js'),
    },
    output: {
      path: '/website/static/dist/',
      publicPath: '/website/static/dist/',
      filename: 'js/[name].bundle.js',
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  },
  parts.loadImages(),
  parts.loadFonts({
    options: {
      name: 'fonts/[name].[ext]',
    },
  }),
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
]);
