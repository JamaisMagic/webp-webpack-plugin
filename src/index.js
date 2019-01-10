const sharp = require('sharp');
const fileType = require('file-type');


const supportedTypes = ['png', 'jpg'];

class WebpWebpackPlugin {
  constructor(options={}) {
    this.type = options.type || supportedTypes,
    this.webp = options.webp || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('WebpWebpackPlugin', async compilation => {
      for (let [key, value] of Object.entries(compilation.assets)) {
        let valueBuffer = value._value;
        let data = null;
        let typeObj = null;

        try {
          typeObj = fileType(valueBuffer);
        } catch(error) {
          continue;
        }

        if (!typeObj) {
          continue;
        }

        let ext = typeObj.ext;

        if (!(supportedTypes.includes(ext) && this.type.includes(ext))) {
          continue;
        }

        try {
          data = await sharp(valueBuffer).webp(this.webp).toBuffer();
        } catch(error) {
          console.error(error);
          continue;
        }

        if (data.length >= valueBuffer.length) {
          console.warn('Converted image is larger than original image. Skip.', key);
          continue;
        }

        compilation.assets[`${key}.webp`] = {
          source() {
            return data;
          },
          size() {
            return data.length
          }
        };
      }
    });
  }
}

module.exports = WebpWebpackPlugin;
