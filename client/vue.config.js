/* eslint-disable @typescript-eslint/no-var-requires */
const IconPreparationPlugin = require('./webpack/plugins/IconPreparationPlugin/IconPreparationPlugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new IconPreparationPlugin('src/assets/icons', 'icons'),
    ],
  },
};
