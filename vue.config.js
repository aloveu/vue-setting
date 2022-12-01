const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
    transpileDependencies: [
      'quasar'
    ],

    configureWebpack: {
        plugins: [new NodePolyfillPlugin()],
    },

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    }
});
