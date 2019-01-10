const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpWebpackPlugin = require('@jamais/webp-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disabled: true
            }
          },
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist/*')]),
    new WebpWebpackPlugin()
  ]
};
