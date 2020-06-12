module.exports = {
    /*
    publicPath:
    path:是指定将静态资源（css、js、img等）打包到指定目录---包括dev和production
    publicPath是在打包到生产环境后（production），指定index.html引用的静态资源的路径，设置的不同会有不同的引用方式
    有根据index.html的相对路径，也有根据服务的url引用，如果你的静态资源是cdn也有cdn引用方式

     // One of the below
        publicPath: 'https://cdn.example.com/assets/', // CDN（总是 HTTPS 协议）
        publicPath: '//cdn.example.com/assets/', // CDN（协议相同）
        publicPath: '/assets/', // 相对于服务(server-relative)
        publicPath: 'assets/', // 相对于 HTML 页面
        publicPath: '../assets/', // 相对于 HTML 页面
        publicPath: '', // 相对于 HTML 页面（目录相同）
    */


    //基本路径
    publicPath: '/mxg-msm',//默认的'/'是绝对路径，如果不确定在根路径（项目名称），改成相对路径'./'
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        requireModuleExtension: true,
        
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: true,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
        host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
        port: 8080,
        hot: true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
        https: false,
        hotOnly: false,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL, //目标接口域名
                secure: false, //false为http访问，true为https访问
                changeOrigin: true, //是否跨域（开启代理服务器）
                pathRewrite: {
                    ['^'+process.env.VUE_APP_BASE_API]: '' //重写接口: http://xxxx:8080/dev-api/db.json 重写为http://xxxx:8080/db.json
                }
            }
        }, // 设置代理
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};
