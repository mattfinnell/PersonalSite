const webpackCommon = require('./webpack.common');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');

module.exports = merge([
  webpackCommon,
  parts.lintJavaScript({ include: [parts.PATHS.assets] }),
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      stats: {
        children: false,
        modules: false,
      },
    },
  },
  parts.extractCSS({
    test: /\.scss/,
    use: [
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceComments: 'true',
        },
      },
    ],
    output: 'css/[name].css',
  }),
  parts.extractCSS({
    test: /\.css$/,
    use: 'css-loader',
    output: 'css/[name].css',
  }),
]);
