const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [],
  },
  resolve: {
    alias: {
      class: path.resolve(__dirname, 'src/class/'),
      object: path.resolve(__dirname, 'src/object/'),
    },
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: './src/index.html',
          to: './',
        },
        {
          from: './src/style.css',
          to: './',
        },
        {
          from: './assets/**',
          to: './',
          context: './src',
        },
      ],
      {}
    ),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    inline:false
  },
};
