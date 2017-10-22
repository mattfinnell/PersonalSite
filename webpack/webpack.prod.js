const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

module.exports = merge([
  common,
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
  parts.minifyJavaScript(),
  parts.clean(
    ['build'],
    {
      root: path.resolve('website', 'static'),
      verbose: true,
    }
  ),
]);
