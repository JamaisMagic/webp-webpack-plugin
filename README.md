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
  ...{'your-other': 'configurations'},
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
3. options.min \[Number\], image which smaller than that will be skipped. Default: 15360(15KB)
4. options.webp \[Object\], default & referrer: [sharp](https://github.com/lovell/sharp)

## Set up your server

In you nginx server, you can set up your configurations for example belows.
```nginx
http {
  # You other configurations

  map $http_accept $webp_suffix {
    default   "";
    "~*webp"  ".webp";
  }

  server {
    # You other configurations

    location ~* /img/.*\.(png|jpg|jpeg)$ {
      add_header Vary Accept;
      try_files $uri$webp_suffix $uri =404;
    }
  }
}
```
