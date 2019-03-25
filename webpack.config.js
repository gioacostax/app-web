/**
 * Copyright © 2015-2019 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const DIR_BUILD = path.resolve(__dirname, './build');
  const DIR_SRC = path.resolve(__dirname, './src');
  const DEV = argv.mode === 'development';

  return {
    entry: {
      app: 'src/index.jsx',
      vendors: [
        'react',
        'react-dom'
      ]
    },

    output: {
      path: DIR_BUILD,
      filename: DEV ? '[name].js?[hash]' : '[name].[hash].js'
    },

    resolve: {
      alias: {
        // Source directory
        src: DIR_SRC,

        // Build direrctory
        build: DIR_BUILD,

        // Preact reduce react and react-dom bundle size
        react: DEV ? 'react' : 'preact-compat',

        // HMR needs a patched react-dom
        'react-dom': DEV ? '@hot-loader/react-dom' : 'preact-compat'
      },
      extensions: ['.js', '.jsx', '.css', '.scss']
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'webpack-remove-block-loader',
              options: {
                active: (!DEV),
              }
            },
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            { loader: 'css-loader', options: { importLoaders: 1 } }, // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS
            'postcss-loader' // PostCSS Procesor
          ]
        },
        {
          test: /\.(otf|woff|woff2|ttf|eot|svg|png|jpe?g|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: DEV ? '[name].[ext]?[hash]' : '[name].[hash].[ext]',
              outputPath: 'assets/'
            }
          }
        }
      ],
    },

    plugins: [
      // Define ENV NODE_ENV as 'production' or 'development' for third party modules
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': DEV ? '"development"' : '"production"'
      }),

      // Delete Build folder
      new CleanWebpackPlugin(),

      // Set global modules.
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom'
      }),

      // Configure and render HTML using a template.
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        minify: { collapseWhitespace: true }
      }),

      // Copy static files into the build folder, ignoring some files.
      new CopyWebpackPlugin([{
        from: 'src/static',
        ignore: ['.DS_Store']
      }])
    ],

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

      // Minimize with Terser Plugin
      // Info: https://webpack.js.org/plugins/terser-webpack-plugin/
      minimize: true,

      // No emit bundle on Errors
      noEmitOnErrors: true,

      // Minify Bundle Size
      occurrenceOrder: true
    },

    // Debug Original Source Lines on Navigator
    devtool: DEV ? 'cheap-module-eval-source-map' : '',

    // Build Log
    // Info: https://webpack.js.org/configuration/stats/
    stats: {
      modules: false,
      children: false
    },

    // Development Log
    // Info: https://webpack.js.org/configuration/dev-server/
    devServer: {
      overlay: true,
      clientLogLevel: 'error',
      stats: {
        modules: false,
        entrypoints: false,
        children: false
      }
    }
  };
};
