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

## If you prefer client side detection, checkout these steps for references

In html, use picture tag.

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="insert alt text here">
</picture>
```

In css, use @supports

```css
.logo-container {
  background-image: url('logo.jpg');

  @supports (background-image: url('logo.webp')) {
    background-image: url('logo.webp');
  }
}
```

In javascript and dom, use canvas's toDataURL method or use Image to load a webp image.

```javascript
const supportWebP = e => document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;

// Or
function supportsWebP() {
  var img = new Image();
  img.onload = function() {
    return img.width === 2;
  };
  img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  return img.onload;
}
```

Misc:

Checkout what [Modernizr](https://github.com/Modernizr/Modernizr/blob/400db4043c22af98d46e1d2b9cbc5cb062791192/feature-detects/img/webp.js) did from github.
[Detect WebP browser support](https://inside.caratlane.com/detect-webp-browser-support-e1063f019b17)
[check-webp-support.js](https://gist.github.com/tlacroix/c59e3c6835064d8febe832d87574ff0e)
[CSS Fallbacks for WebP background images with @supports](https://www.js-craft.io/blog/css-fallbacks-for-webp-background-images-with-supports/)
