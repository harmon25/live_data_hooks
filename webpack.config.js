const path = require("path");

module.exports = {
  entry: "./src/hooks.js",
  output: {
    filename: "hooks.js",
    path: path.resolve(__dirname, "dist"),
    library: "@live-data/hooks",
    libraryTarget: "umd",
    globalObject: "this",
  },
  externals: {
    react: "react",
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, "./src/hooks.js"),
        use: [
          {
            loader: "expose-loader",
            options: "@live-data/hooks",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [],
};
