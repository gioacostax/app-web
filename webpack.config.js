/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const DIR_BUILD = path.resolve(__dirname, './build');
const DIR_SRC = path.resolve(__dirname, './src');

let DEV = process.env.NODE_ENV === 'development';

const modules = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [].concat(DEV ? ['react-hot-loader/babel'] : [])
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ],
  }
};

const plugins = {
  plugins: [
    // Set global modules.
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),

    // Configure and render HTML using a template.
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'src/index.ejs'
    }),

    // Copy static files into the build folder, ignoring some files.
    new CopyWebpackPlugin([{
      from: 'src/static',
      ignore: ['.DS_Store']
    }]),

    // Delete Build folder
    new CleanWebpackPlugin([DIR_BUILD])
  ]
};

const optimize = {
  optimization: {
    // Merge commons modules in one file.
    // Example: https://webpack.js.org/plugins/split-chunks-plugin/#defaults-example-2
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            // Secure mode to delete all comments in the bundle file.
            comments: false
          }
        }
      })
    ]
  }
};

const debug = {
  // Debug Original Source Lines on Navigator
  devtool: 'cheap-module-eval-source-map',

  // Hide Modules Log
  stats: {
    modules: false
  }
};

module.exports = (env, argv) => {
  DEV = argv.mode === 'development';

  return Object.assign({
    entry: {
      app: DEV ? path.resolve(__dirname, './index.hmr.js') : 'src/index.jsx',
      vendors: ['react', 'react-dom']
    },

    output: {
      path: DIR_BUILD,
      filename: '[name].js?[hash]'
    },

    resolve: {
      alias: {
        src: DIR_SRC,
        build: DIR_BUILD
      },
      extensions: ['.js', '.jsx', '.css', '.scss']
    }
  }, modules, plugins, optimize, DEV ? debug : {});
};
