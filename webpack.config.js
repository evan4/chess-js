const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path:  path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3005
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader/url"
          },
          {
            loader: "file-loader",
            options: {
              name: '[name].css',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    // файлы подключаемые в приложение без указания расширения
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  mode: 'development',
};