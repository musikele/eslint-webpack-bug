const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const path = require('path');

const rootDir = path.resolve('./');

const settings = require('./settings');
const helpers = require('./helpers');
const eslintConfig = require(rootDir + '/eslint.config.js');

module.exports = {
  output: {
    filename: '[name].js',
    path: settings.OUTPUT_DIR,
    publicPath: '/dist/',
    hashFunction: 'md5',
    hashDigestLength: 32,
  },
  plugins: [
    new ESLintPlugin({
      configType: 'flat',
      eslintPath: 'eslint/use-at-your-own-risk',
      overrideConfigFile: true,
      overrideConfig: eslintConfig,
      // need to explicitly call the formatter because ESLint formatter is
      // loaded dynamically, using ESM syntax, and we are using CJS for webpack.
      //   formatter: require(
      //     rootDir + '/node_modules/eslint/lib/cli-engine/formatters/stylish'
      //   ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: helpers.root('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg|webm)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [rootDir, 'node_modules'],
  },
  devtool: 'eval-source-map',
};
