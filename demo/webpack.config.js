import path from 'node:path';
import url from 'node:url';
import WebpWebpackPlugin from '@jamais/webp-webpack-plugin';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
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
