/* eslint-disable @typescript-eslint/no-var-requires */
const IconPreparationPlugin = require('./webpack/plugins/IconPreparationPlugin/IconPreparationPlugin');

module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_API_URL,
  },
  configureWebpack: {
    plugins: [
      new IconPreparationPlugin('src/assets/icons', 'icons'),
    ],
  },
};
