const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts.js');

module.exports = merge([
  {
    entry: {
      app: path.resolve(parts.PATHS.assets, 'js', 'script.js'),
      vendor: ['bootstrap-loader/extractStyles'],
    },
    output: {
      path: '/website/static/dist/',
      publicPath: '/website/static/dist/',
      filename: 'js/[name].bundle.js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      // new webpack.IgnorePlugin(new RegExp(unusedSourceSansProFonts)),
    ],
  },
  parts.extractSass({
    include: [
      parts.PATHS.assets,
      path.resolve('node_modules', 'font-awesome'),
    ],
  }),
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
