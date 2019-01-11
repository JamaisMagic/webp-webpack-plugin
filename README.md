# webp-webpack-plugin
Convert images to webp and keep the original file name.

## Requirements

* node.js 8+
* webpack 4+

## Features

* Support and only support png and jpg images.
* If converted file is bigger than original file, skip this file.
* Auto disabled in development mode.

## Usage

```bash
npm install --save-dev @jamais/webp-webpack-plugin
```

In your webpack.config.js

```javascript
const WebpWebpackPlugin = require('@jamais/webp-webpack-plugin');

const options = {
  type: ['jpg', 'png'],
  webp: {
    quality: 75
  }
};

module.exports = {
  mode: 'production',
  ...{'your-others': 'config'},
  plugins: [
    new WebpWebpackPlugin(options)
  ]
};

// output
// [name].[hash].jpg
// [name].[hash].jpg.webp
```

Constructor parameters

1. options Object
2. options.type \[String\] | \[Array\], default: ['jpg', 'png'], example: ['jpg', 'png'], 'png'
3. options.webp \[Object\], default & referrer: [sharp](https://github.com/lovell/sharp)
