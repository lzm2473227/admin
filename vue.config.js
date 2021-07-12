/* eslint-disable @typescript-eslint/no-var-requires */
const bodyParser = require('body-parser')
const mockServer = require('./src/utils/mock/server');
const { NODE_ENV, VUE_APP_PORT, VUE_APP_MOCK } = process.env;
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,
    devServer: {
        port: VUE_APP_PORT || 8001,
        // 配置反向代理 解决跨域
        proxy: {
            '/api': {
                target: 'http://192.168.1.156:10003', // 源地址
                changeOrigin: true, // 改变源
                pathRewrite: {
                    '^/api': '' // 路径重写    /api === http://192.168.1.130:10015
                }
            }
        }
    },
    // 修改webpack的配置
    configureWebpack: {
        // 不需要打包的插件
        externals: {
            // 'vue': 'Vue',
            // 'vue-router': 'VueRouter',
            // 'element-ui': 'ELEMENT'            
        }
    },
    chainWebpack(config) {

        // 内置的 svg Rule 添加 exclude
        config.module
            .rule('svg')
            .exclude.add(/iconsvg/)
            .end();

        // 添加 svg-sprite-loader Rule
        config.module
            .rule('svg-sprite-loader')
            .test(/.svg$/)
            .include.add(/iconsvg/)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader');

        // 添加 svgo Rule
        config.module
            .rule('svgo')
            .test(/.svg$/)
            .include.add(/iconsvg/)
            .end()
            .use('svgo-loader')
            .loader('svgo-loader')
            .options({
                // externalConfig 配置特殊不是相对路径，起始路径是根目录
                externalConfig: './src/assets/iconsvg/svgo.yml',
            });

    }
}