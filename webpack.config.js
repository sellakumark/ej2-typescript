module.exports = {
  mode: "development",
  entry: {
    "src/bundle": "./src/index.ts"
  },
  output: {
    filename: "src/index.js"
  },
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
