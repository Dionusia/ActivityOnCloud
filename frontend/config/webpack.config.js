const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { prototype } = require('events');
const { postcss } = require('tailwindcss');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    port:5000,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};