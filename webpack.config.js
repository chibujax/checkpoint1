const path = require('path');
const webpack = require('webpack');

const BUILD_PATH = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname);

const envsDefinePlugin = new webpack.DefinePlugin({
  'process.env.apiKey': JSON.stringify(process.env.apiKey),
});

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: `${APP_DIR}/main.js`,
  output: {
    path: BUILD_PATH,
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    envsDefinePlugin,
  ],
};

