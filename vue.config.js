module.exports = {
    devServer: {
        host: "localhost",
        port: 8081, // 端口号
        https: false, // https:{type:Boolean}
        // open: true, //配置自动启动浏览器
        //配置跨域
        proxy: {
            '/api': {
                // 要代理的地址
                target: 'http://localhost:8079',
                ws:true,
                //允许跨域
                changeOrigin: true,
                // 如果是https接口的话，需要配置这个参数
                //重写接口
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    }
}
