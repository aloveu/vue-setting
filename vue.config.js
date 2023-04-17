module.exports = {
    transpileDependencies: ['quasar'],
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false,
        },
        webpackBundleAnalyzer: {
            openAnalyzer: false,
        },
    },
    configureWebpack: (config) => {
        config.output.filename = 'js/[name].[chunkhash].js';
        config.output.chunkFilename = 'js/[name].[chunkhash].js';
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                  @import "@/assets/scss/_variable.scss";
                `,
            },
        },
    },
};
