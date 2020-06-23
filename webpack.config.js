var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/Components/app.js",
  output: { path: __dirname + "/src", filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: "css-loader",
      },
    ],
  },
};
