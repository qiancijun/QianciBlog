module.exports = {
    devServer: {
        host: "localhost",
        port: 80, // 端口号
        https: false, // https:{type:Boolean}
        // open: true, //配置自动启动浏览器
        //配置跨域
        proxy: {
            '/api': {
                // 要代理的地址
                // target: 'http://192.168.74.100:8079',
                target: 'http://172.18.72.188:8080',
                ws:true,
                //允许跨域
                changeOrigin: true,
                // 如果是https接口的话，需要配置这个参数
                //重写接口
                pathRewrite: {
                    '^/api': ''
                },
            }
        },
    },
    configureWebpack: config => {
        config.externals = { // 不会被打包的库
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element': 'Element',
        'axios': 'axios',
        'katex': 'katex',
        }
    },
    publicPath: "./",
    productionSourceMap: false,
}
