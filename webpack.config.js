const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
require("dotenv").config();

module.exports = env => ({
  entry: "./src/app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  node: {
    net: "empty",
    fs: "empty"
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
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", MiniCSSExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[ext]",
              outputPath: "./assets/img/"
            }
          }
        ]
      }
    ]
  },
  devtool: env.production ? "source-maps" : "eval",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/app/App.html",
      filename: "index.html"
    }),
    new MiniCSSExtractPlugin({
      filename: "style.css"
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      "process.env.SECRET_KEY": JSON.stringify(process.env.SECRET_KEY),
      "process.env.GOOGLE_API_KEY": JSON.stringify(process.env.GOOGLE_API_KEY),
      "process.env.CLOUDINARY_UPLOAD_URL": JSON.stringify(process.env.CLOUDINARY_UPLOAD_URL),
      "process.env.CLOUDINARY_UPLOAD_PRESET": JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET)
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
