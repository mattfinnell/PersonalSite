const webpackCommon = require('./webpack.common.js');

const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');

module.exports = merge([
  webpackCommon,
  {
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
  parts.extractCSS({
    test: /\.css/,
    use: [
      'css-loader',
      parts.autoprefix,
    ],
    output: 'css/[name].css',
  }),
  parts.extractCSS({
    test: /\.scss/,
    use: [
      'css-loader',
      parts.autoprefix,
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'compressed',
        },
      },
    ],
    output: 'css/[name].css',
  }),
  // parts.generateSourceMaps({ type: 'source-map' }),
  parts.uglifyJS(),
]);
