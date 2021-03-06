// @flow
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./src/content",
        to: "content",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/favicons",
        to: "",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/assets",
        to: "assets",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/index.html",
        to: ""
      }
    ])
  ],
  entry: ["webpack-hot-middleware/client", "./src/index.js"],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|jpg|png)$/,
        use: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.json$/,
        enforce: "pre",
        use: "gzip-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist", ""),
    filename: "bundle.js",
    publicPath: "/"
  }
};
