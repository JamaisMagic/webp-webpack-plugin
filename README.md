# webp-webpack-plugin
Convert images to webp and keep the original file name.

## Requirements

* node.js 14+
* webpack 5+
* If you are using webpack 4, you may check out the previous version: [0.0.8](https://www.npmjs.com/package/@jamais/webp-webpack-plugin/v/0.0.8).

## Features

* Support and only support png and jpg images.
* If converted file is bigger than original file, skip this file.
* Auto disabled in development mode.
* Support ES Module.

## Usage

```bash
npm install --save-dev @jamais/webp-webpack-plugin
```

In webpack.config.js

```javascript
import WebpWebpackPlugin from '@jamais/webp-webpack-plugin';

const options = {
  type: ['jpg', 'png'],
  webp: {
    quality: 75
  }
};

export default {
  mode: 'production',
  ...{'Other': 'configurations'},
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
3. options.min \[Number\], image which smaller than that will be skipped. Default: 8192(8KB)
4. options.webp \[Object\], default & referrer: [sharp](https://github.com/lovell/sharp)

## Setup the server

In nginx server, you can setup the configurations for example belows.
```nginx
http {
  # Other configurations

  map $http_accept $webp_suffix {
    default   "";
    "~*webp"  ".webp";
  }

  server {
    # Other configurations

    location ~* /img/.*\.(png|jpg|jpeg)$ {
      add_header Vary Accept;
      try_files $uri$webp_suffix $uri =404;
    }
  }
}
```
