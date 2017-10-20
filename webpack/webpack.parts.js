const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');
const autoprefixer = require('autoprefixer');

const assetsDir = path.join('website', 'static');
const buildDir = path.join('build');
const absoluteAssetsDir = path.resolve(assetsDir);
const absoluteBuildDir = path.resolve(assetsDir, 'build');

module.exports.PATHS = {
  assets: absoluteAssetsDir,
  output: absoluteBuildDir,
  public: buildDir,
};

exports.extractCSS = ({ test, output, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: output,
  });

  return {
    module: {
      rules: [{
        test,
        use: plugin.extract({
          use,
        }),
      }],
    },
    plugins: [plugin],
  };
};

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude,
      enforce: 'pre',
      loader: 'eslint-loader',
      options,
    }],
  },
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    }],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,

        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.clean = (dirsToClean, options = {}) => ({
  plugins: [
    new CleanWebpackPlugin(dirsToClean, options),
  ],
});

exports.autoprefix = {
  loader: 'postcss-loader',
  options: {
    plugins: [autoprefixer()],
  },
};

exports.minifyJavaScript = () => ({
  plugins: [
    new BabelWebpackPlugin(),
  ],
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});
