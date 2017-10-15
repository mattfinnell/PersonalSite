const webpack = require('webpack');
const path = require('path');

const ClosureCompilerPlugin = require('webpack-closure-compiler');
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const autoprefixer = require('autoprefixer');

const assetsDir = 'website/static/';
const buildDir = 'website/static/build/';
const absoluteAssetsDir = path.resolve(assetsDir);
const absoluteBuildDir = path.resolve(buildDir);

const PATHS = {
  assets: absoluteAssetsDir,
  output: absoluteBuildDir,
  public: buildDir,
};

module.exports.PATHS = PATHS;

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

exports.extractSass = ({ include, exclude }) => {
  const plugin = new ExtractTextPlugin({
    filename: 'css/[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    autoprefixer(),
                  ]),
                },
              }, {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

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

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.minifyJavaScript = () => ({
  plugins: [new BabelWebpackPlugin()],
});

exports.googleClosureCompiler = () => ({
  plugins: [
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED',
      },
      jsCompiler: true,
    }),
  ],
});

exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});
