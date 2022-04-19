const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',

  entry: [
    // 'react-hot-loader/patch', 热更新插件已改用react-refresh
    // 'webpack-hot-middleware/client?reload=true',
    './src/index.tsx', // Start with js/app.js
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    port: 8000,
    // contentBase: '../dist',
    publicPath: '/',
    open: true,
    hot: true,
    historyApiFallback: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
  target: 'web',
  plugins: [
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: './public/index.html',
    }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'cheap-module-source-map',

  performance: {
    hints: false,
  },
};

module.exports = merge(common, devConfig);
