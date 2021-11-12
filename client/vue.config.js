/* eslint-disable @typescript-eslint/no-var-requires */
const IconPreparationPlugin = require('./webpack/plugins/IconPreparationPlugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new IconPreparationPlugin(),
    ],
  },
};
