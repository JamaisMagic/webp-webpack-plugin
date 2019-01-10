class WebpWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('WebpWebpackPlugin', compilation => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Done WebpWebpackPlugin');
          resolve();
        }, 5000);
      });
    });
  }
}

module.exports = WebpWebpackPlugin;
