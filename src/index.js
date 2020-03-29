const sharp = require('sharp');
const fileType = require('file-type');


const supportedTypes = ['png', 'jpg'];
const DEFAULT_MIN_LIMIT = 8192;

class WebpWebpackPlugin {
  constructor(options={}) {
    this._type = options.type || [...supportedTypes],
    this._webp = options.webp || {};
    this._min = Number.parseInt(options.min) || DEFAULT_MIN_LIMIT;

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
      if (compiler.options.mode === 'development') {
        return;
      }

      const that = this;
      const entries = Object.entries(compilation.assets);

      async function handle(key, value) {
        if (!key || !value) {
          return;
        }
        const valueBuffer = value.source();
        let typeObj = null;
        let data = null;

        if (!Buffer.isBuffer(valueBuffer)) {
          return;
        }

        try {
          typeObj = fileType(valueBuffer);
        } catch(error) {
          return;
        }

        if (!typeObj) {
          return;
        }

        let ext = typeObj.ext;

        if (!that._type.includes(ext)) {
          return;
        }

        if (valueBuffer.length <= that._min) {
          return;
        }

        try {
          data = await sharp(valueBuffer).webp(that._webp).toBuffer();
        } catch(error) {
          return;
        }

        if (data.length >= valueBuffer.length) {
          return;
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

      async function consume() {
        while (entries.length > 0) {
          const yielded = entries.splice(0, 4);
          await Promise.all(yielded.map(item => {
            return handle(item[0], item[1]);
          }));
        }
      }

      await consume();
    });
  }
}

module.exports = WebpWebpackPlugin;
