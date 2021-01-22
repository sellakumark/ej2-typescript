var path = require("path");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "src/app/bundle": "./src/app/index.ts"
  },
  output: {
    filename: "src/app/index.js"
  },
  devtool: "none",
  module: {
    rules: [
      {
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  }
};
