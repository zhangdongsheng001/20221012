/*
 * 全局配置
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve=dir=>{
    return path.join(__dirname,dir);
};

module.exports = {
    runtimeCompiler: true,
    publicPath:'./',
    productionSourceMap:false,
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8844',
        https: false,  //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://127.0.0.1',//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,    //這裡true表示实现跨域
                pathRewrite: {
                    '^/api':''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                }
            }
        },  // 代理
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    pluginOptions:{
        'style-resources-loader':{
            preProcessor:'less',
            patterns:[
                path.resolve(__dirname, 'src/assets/css/const.less')
            ]
        }
    },
    configureWebpack:{
        name: 'jinglingtu',
        // entry:'./src/main.js',
        // output: {
        //     path: path.resolve(__dirname,'dist'),
        //     filename: 'bundle.js'
        // },
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins:[
            new HtmlWebpackPlugin({
                filename:'front_page_index.html',
                template:'./public/index.html'
            }),
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp('\.(js|css|json)$'), //匹配文件名
                threshold: 10240, //对10K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false //是否删除源文件
            })
        ],
        externals:{
            'vue':'Vue',
            'vue-router':'VueRouter',
            'vuex':'Vuex',
            'axios':'axios',
            'qs':'Qs'
        }
    }
};
