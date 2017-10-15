const webpackCommon = require('./webpack.common.js');

const merge = require('webpack-merge');
const parts = require('./webpack.parts.js');
// const glob = require('glob');

module.exports = merge([
  webpackCommon,
  {
    devServer: {
      stats: {
        children: false,
        modules: false,
      },
    },
  },
  // parts.purifyCSS({
  //   paths: glob.sync(`${parts.PATHS.assets}/**/*.js`, { nodir: true }),
  // }),
  // parts.generateSourceMaps({ type: 'source-map' }),
  // parts.minifyJavaScript(),
]);
