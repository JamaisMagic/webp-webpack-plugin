const path = require('path');
const WebpWebpackPlugin = require('@jamais/webp-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new WebpWebpackPlugin({
      type: ['jpg', 'gif'],
    })
  ]
};
