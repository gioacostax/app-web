/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const rimraf = require('rimraf');

// Webpack Plugins
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// Global variables
const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const PATH_BUILD = path.resolve(__dirname, 'build');
const PATH_SRC = path.resolve(__dirname, 'src');

module.exports = (env, argv) => {
  // If production or development mode
  const DEV = argv.mode !== 'production';

  // Delete build directory
  rimraf.sync(PATH_BUILD);

  return {
    // Required for React-Refresh
    node: DEV ? { global: true, } : false,

    entry: PACKAGE.app.main_js,

    output: {
      // Build Folder + Start URL (optional*)
      path: `${PATH_BUILD}${PACKAGE.app.start_url}`,

      // Entrypoint filename
      filename: 'js/[name].[chunkhash:6].js',

      // Ref final url in html and css bundles if necessary
      publicPath: DEV ? '/' : PACKAGE.app.start_url
    },

    resolve: {
      alias: {
        // Alias src directory to avoid use relative paths
        [PACKAGE.app.src_alias]: PATH_SRC,

        // Preact reduce react and react-dom bundle size
        react: DEV ? 'react' : 'preact/compat',
        'react-dom': DEV ? 'react-dom' : 'preact/compat'
      },

      // Avoid use extensiones importing modules
      extensions: ['.js', '.jsx', '.css', '.scss', '.sass']
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              // Remove dev blocks
              loader: 'webpack-remove-block-loader',
              options: { active: (!DEV), }
            },
            {
              loader: 'babel-loader',
              options: {
                plugins: DEV ? ['react-refresh/babel'] : [],
              },
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Relevant order to correct parsing
            ...DEV ? ['style-loader'] : [MiniCssExtractPlugin.loader],
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(otf|woff|woff2|ttf|eot|svg|png|webp|jpe?g|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[contenthash:12].[ext]',
              outputPath: 'assets'
            }
          }
        }
      ]
    },

    plugins: [
      // Show errors in webpack console
      new ESLintPlugin({ extensions: ['js', 'jsx', 'css', 'scss', 'sass'] }),

      // Define ENV NODE_ENV as 'production' or 'development' for third party modules
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': DEV ? '"development"' : '"production"'
      }),

      // Configure and render HTML using a template.
      new HtmlPlugin({
        title: PACKAGE.app.title,
        description: PACKAGE.app.description,
        path: DEV ? '/' : PACKAGE.app.start_url,
        template: PACKAGE.app.index_html,
        inject: true
      }),

      // Add Attr in the bundle tag
      new ScriptExtHtmlPlugin({
        defaultAttribute: 'async'
      }),

      // Copy static files into the build folder, ignoring some files.
      new CopyPlugin({
        patterns: [
          {
            from: PACKAGE.app.static_dir,
            globOptions: {
              ignore: ['.DS_Store'],
            }
          },
        ],
      }),

      // Conditional plugins
      ...DEV ? [
        // HMR
        new ReactRefreshPlugin(),

        // Required for React-Refresh
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
      ] : [
        // Verbose build
        new DashboardPlugin(),

        // Extract styles in a single file
        new MiniCssExtractPlugin({
          filename: 'css/[name].[chunkhash:6].css'
        })
      ]
    ],

    optimization: {
      // Merge shared modules in a single file.
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
      },

      // Custom minimizer
      minimizer: [
        new TerserJSPlugin(),
        new CssMinimizerPlugin()
      ]
    },

    // Debug Original Source Lines in Navigator
    devtool: DEV ? 'cheap-module-source-map' : false,

    // Build log
    stats: {
      modules: false
    },

    // Development config
    devServer: {
      stats: {
        modules: false,
        assets: false,
        entrypoints: false,
        colors: true
      },
      historyApiFallback: {
        rewrites: [
          // Github and Vercel uses by default 404.html TODO: Test
          { from: /./, to: `${PACKAGE.app.start_url}404.html` }
        ]
      },
      clientLogLevel: 'warn',
      port: 3000,
      hot: true, // Avoid reloading page
      host: '0.0.0.0' // External preview
    }
  };
};
