import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // 🚪 Ponto de entrada
  entry: {
    main: './src/server/server.ts',
  },

  // 🏗️ Build mode
  mode: 'development',
  //mode: 'production',

  // 🐞 Source maps para debugging
  devtool: 'source-map',

  // 🔄 Resolução de módulos e configurações de fallback
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      async_hooks: false,
      perf_hooks: false,
      fs: false,
    },
  },

  // 🔄 Regras de transformação (Loaders)
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/lodash/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },

  // ⚙️ Configuração de saída
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/webpack'),
    clean: true,
  },

  devServer: {
    headers: {
      'Cache-Control': 'no-store', // Desativa cache
    },
    static: {
      directory: path.join(__dirname, 'dist/webpack'),
    },
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ['src'],
    hot: true,
    client: {
      overlay: true,
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true, // Escreve os arquivos no disco
    },
  },

  // 🧹 Plugins para otimização
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.ContextReplacementPlugin(/@mapbox\/node-pre-gyp/),
    new webpack.ContextReplacementPlugin(/bcrypt/),
    new webpack.IgnorePlugin({
      resourceRegExp: /^(mock-aws-s3|aws-sdk|nock)$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^(gcp-metadata|snappy|socks|aws4|@aws-sdk\/credential-providers)$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^(mongodb-client-encryption)$/,
    }),
    new webpack.ContextReplacementPlugin(/express/),
    new webpack.ContextReplacementPlugin(/@mapbox\/node-pre-gyp/),
    new webpack.ContextReplacementPlugin(/swagger-jsdoc/),
  ],

  // 🔄 Externals
  externals: {
    npm: 'commonjs npm',
    aws4: 'commonjs aws4',
    socks: 'commonjs socks',
    snappy: 'commonjs snappy',
    kerberos: 'commonjs kerberos',
    nock: 'commonjs nock',
    'aws-sdk': 'commonjs aws-sdk',
    'node-gyp': 'commonjs node-gyp',
    'mock-aws-s3': 'commonjs mock-aws-s3',
    'gcp-metadata': 'commonjs gcp-metadata',
    '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
    'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
    '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers',
  },

  // Configuração de compatibilidade
  target: 'node', // Suporte ao Node.js
};
