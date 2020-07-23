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
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

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
    node: {
      // Avoid injecting node functions
      process: DEV
    },

    entry: {
      main: [
        ...DEV ? ['react-hot-loader/patch'] : [], // Hot patch
        PACKAGE.app.main_js
      ],

      // No tengo claro por qué toca especificar un modulo de entrada
      // para que exporte un chunk por separado en esta versión básica.
      // En MOBX no hace falta esta linea a continuación.
      vendors: 'preact/compat'
    },

    output: {
      // Build Folder + Start URL (optional*)
      path: `${PATH_BUILD}${PACKAGE.app.start_url}`,

      // Chunk files format
      chunkFilename: 'js/[name].[chunkhash:6].js',

      // Entrypoint filename
      filename: 'js/[name].[hash:6].js',

      // Ref final url in html and css bundles if necessary
      publicPath: DEV ? '/' : PACKAGE.app.start_url
    },

    resolve: {
      alias: {
        // Alias src directory to avoid use relative paths
        [PACKAGE.app.src_alias]: PATH_SRC,

        // Preact reduce react and react-dom bundle size
        react: DEV ? 'react' : 'preact/compat',

        // HMR Hook Support and reduce react-dom bundle size
        'react-dom': DEV ? '@hot-loader/react-dom' : 'preact/compat'
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
            { loader: 'babel-loader' }
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
      // Define ENV NODE_ENV as 'production' or 'development' for third party modules
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': DEV ? '"development"' : '"production"'
      }),

      // Stylized in browser errors, it shows compiled babel source
      new ErrorOverlayPlugin(),

      // Configure and render HTML using a template.
      new HtmlPlugin({
        title: PACKAGE.app.title,
        description: PACKAGE.app.description,
        path: DEV ? '/' : PACKAGE.app.start_url,
        template: PACKAGE.app.index_html,
        minify: { collapseWhitespace: true },
        inject: true
      }),

      // Add Attr in the bundle tag
      new ScriptExtHtmlWebpackPlugin({
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

      // Production plugins
      ...DEV ? [] : [
        // Verbose build
        new DashboardPlugin(),

        // Extract styles in a single file
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:6].css'
        })
      ]
    ],

    optimization: {
      // Merge share modules in a single file.
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          }
        }
      },

      // Custom minimizer
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },

    // Debug Original Source Lines in Navigator
    devtool: DEV ? 'cheap-module-source-map' : false,

    // Build log
    stats: {
      modules: false,
      children: false
    },

    // Development config
    devServer: {
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
    },

    // Performance warnings
    performance: {
      hints: false
    }
  };
};
