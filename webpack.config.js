const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env) => ({
  entry: './src/app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: env.production ? 'source-maps' : 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/App.html',
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.SECRET_KEY': JSON.stringify(process.env.SECRET_KEY)
    })
  ]
});
