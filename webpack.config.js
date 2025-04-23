// 📦 webpack.config.js
import path from 'path'; // 🗂️ Path manipulation
import webpack from 'webpack'; // 🧰 Webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin'; // 🌐 Generates index.html
import { fileURLToPath } from 'url'; // 🔗 ES Modules support
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // 🧹 Cleans dist folder

// 🌍 Load environment variables from .env

// 📍 Resolving __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // 🚪 App entry points
  entry: {
    main: './src/server.ts', // 🎬 Main entry
    //...(fs.existsSync('./src/vendor.js') && { vendor: './src/vendor.js' }), // 🧰 External dependencies
  },

  // 🏗️ Build mode
  mode: 'production',

  // 🐞 Source maps for debugging
  devtool: 'source-map',

  // 💻 Dev Server with auto-reload
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 📂 Served files directory
    },
    compress: true, // 🗜️ Compression enabled
    port: 9000, // 🚪 Local port
    hot: true, // 🔥 Hot Module Replacement
    watchFiles: ['src/index.html'], // 👈 👀 Watch HTML changes!
  },

  // 🔄 Automatic extension resolution and aliases
  resolve: {
    fallback: {
      'node-gyp': false,
      npm: false,
      path: path.resolve('path-browserify'),
      util: path.resolve('util/'),
      async_hooks: false,
      perf_hooks: false,
      os: path.resolve('os-browserify/browser'),
      buffer: path.resolve('buffer/'),
      zlib: path.resolve('browserify-zlib'),
      crypto: path.resolve('crypto-browserify'),
      fs: false, // Not supported in Webpack
      stream: path.resolve('stream-browserify'),
      querystring: path.resolve('querystring-es3'),
      http: path.resolve('stream-http'),
      https: path.resolve('https-browserify'),
      assert: path.resolve('assert'),
      process: path.resolve('process/browser'),
    }, // 🔗 Native module support
    extensions: ['.js', '.ts'], // 📑 Resolved extensions
    alias: {
      '@': path.resolve(__dirname, 'src'), // 🧭 Shortcut to src/
    },
  },

  // ⚡ Bundle optimization: separates dependencies
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 🏢 Everything from node_modules
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  // 🚫 Disable performance warnings
  performance: {
    hints: false,
  },

  // 🔧 Loaders (you can add more here as needed)
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },

  // 📤 Bundle output files
  output: {
    filename: '[name].[contenthash].js', // 🧩 Name with hash for cache busting
    path: path.resolve(__dirname, 'dist'), // 📁 Destination folder
    clean: true, // 🧽 Clean folder before build
  },

  // 🧰 Magic plugins
  plugins: [
    new webpack.ContextReplacementPlugin(/express[\\/]lib/, false), // 🔧 Express fix
    new HtmlWebpackPlugin({
      template: './src/index.html', // 📄 Base template
    }),
    new CleanWebpackPlugin(), // 🧹 Clean dist/
    new webpack.DefinePlugin({
      'process.env.NODE_PROD': JSON.stringify(process.env.NODE_), // 🔐 Environment variables
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', // 🔗 Global jQuery
      jQuery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(), // 🔥 HMR enabled
    new webpack.IgnorePlugin({
      //resourceRegExp: /^.*$/,
      contextRegExp: /moment$/,
      resourceRegExp: /async_hooks|perf_hooks/,
    }), // 🚫 Ignore moment.js
  ],
};
