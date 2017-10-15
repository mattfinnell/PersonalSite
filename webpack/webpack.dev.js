const webpackCommon = require('./webpack.common.js');
const parts = require('./webpack.parts.js');
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
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
]);
