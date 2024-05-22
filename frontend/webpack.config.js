const path = require('path'); // added
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.tsx", // updated
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // updated
    },
    historyApiFallback: true,
    port: 3000,
    open: {
      app: {
        name: "google-chrome",
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
    fallback: { "tty": require.resolve("tty-browserify") },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // updated
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],
};