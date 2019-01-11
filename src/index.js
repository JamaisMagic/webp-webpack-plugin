const sharp = require('sharp');
const fileType = require('file-type');


const supportedTypes = ['png', 'jpg'];

class WebpWebpackPlugin {
  constructor(options={}) {
    this._type = options.type || [...supportedTypes],
    this._webp = options.webp || {};

    if (!Array.isArray(this._type)) {
      this._type = [this._type + ''];
    }

    this._type = this._type.filter(item => {
      return supportedTypes.includes(item);
    });

    if (this._type.length <= 0) {
      this._type = [...supportedTypes];
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise({
      name: 'WebpWebpackPlugin',
      context: true,
    }, async (context, compilation) => {
      const reportProgress = context && context.reportProgress;
      const entries = Object.entries(compilation.assets);
      const entriesLength = entries.length;
      let index = 0;

      if (compiler.options.mode === 'development') {
        return;
      }

      for (let [key, value] of entries) {
        let valueBuffer = value.source();
        let typeObj = null;
        let data = null;

        reportProgress && reportProgress(index++ / entriesLength, 'Finish progress');

        if (!Buffer.isBuffer(valueBuffer)) {
          continue;
        }

        try {
          typeObj = fileType(valueBuffer);
        } catch(error) {
          continue;
        }

        if (!typeObj) {
          continue;
        }

        let ext = typeObj.ext;

        if (!this._type.includes(ext)) {
          continue;
        }

        try {
          data = await sharp(valueBuffer).webp(this._webp).toBuffer();
        } catch(error) {
          continue;
        }

        if (data.length >= valueBuffer.length) {
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
