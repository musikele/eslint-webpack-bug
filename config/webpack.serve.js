const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const settings = require('./settings');

const config = webpackMerge.mergeWithRules(helpers.webpackMergeRules)(
  commonConfig,
  {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
      bundle: helpers.getBundle(),
    },
    externals: {
      jquery: '$',
    },
    output: {
      // vvm2 serve static files at process.env.EXTERNAL_HOST meanwhile old vvm uses same
      // host and path of the devServer
      publicPath: process.env.EXTERNAL_HOST
        ? `https://${process.env.EXTERNAL_HOST}/`
        : `http://${settings.SERVE_BUNDLE_HOST}:${settings.SERVE_BUNDLE_PORT}/`,
      assetModuleFilename: '[path][name][ext]',
    },
    devServer: {
      host: settings.SERVE_BUNDLE_HOST,
      port: settings.SERVE_BUNDLE_PORT,
      // EXTERNAL_HOST and EXTERNAL_PORT is populated only for vvm2.
      // Preserving previous values for compatibility with the old vvm
      ...(process.env.EXTERNAL_HOST && {
        sockHost: process.env.EXTERNAL_HOST,
      }),
      sockPort: process.env.EXTERNAL_PORT || settings.SERVE_BUNDLE_PORT,
      disableHostCheck: true,
      liveReload: !!process.env.EXTERNAL_HOST,
    },
  }
);

module.exports = config;
