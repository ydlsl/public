var path = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩插件
const TerserPlugin = require('terser-webpack-plugin')

const FileHandler = require('./filehandler')
// 预处理一些文件

const fileHandler = new FileHandler();
const modularDict = fileHandler.getModule('src')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const pageType = process.argv[4] || 'home' // 本地运行 时候的标记 模式 --type 不可减少

const modular = Object.keys(modularDict);
// 根据入口来设置pages
function setPage() {
  const commonConfig = {
    template: "public/index.html",
    filename: "index.html",
  }
  const pagesMap = {}
  modular.map(item=>{
    let target = {
      [item]: {
        entry: `src/${item}/main`, //`src/${item}/main`
        ...commonConfig,
        title: `ly-allthingcrash-${item}-${new Date().toLocaleString()}`,
        chunks: ["chunk-vendors", "chunk-common", `${item}`]
      }
    }
    pagesMap[item] = target
  })
  return pagesMap[pageType];
}

function setOutputDir() {
  const dirMap = {}
  modular.map(item=>{
    dirMap[`${item}`] = `Publish/${item}`
  })
  var outputDir = dirMap[pageType] || 'Publish/Debug'

  return outputDir
}

const isProdOrTest = process.env.NODE_ENV !== 'development'

module.exports = {
  lintOnSave: false, //eslint验证
  publicPath: './',
  outputDir: setOutputDir(),
  pages: setPage(), //页面配置
  filenameHashing: true,
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  chainWebpack:(config)=>{
    // config.plugins.delete('prefetch');//默认开启prefetch(预先加载模块)，提前获取用户未来可能会访问的内容 在首屏会把这十几个路由文件
    if (isProdOrTest) {
      // 对超过10kb的文件gzip压缩
      config.plugin('compressionPlugin').use(
          new CompressionWebpackPlugin({
              filename: '[path][base].gz',
              test: /\.(js|css|html)$/,// 匹配文件名
              algorithm: 'gzip',
              threshold: 10240, // 只有大小大于该值的资源会被处理 10240
              minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
              // deleteOriginalAssets: false // 删除原文件
          })
      );
    }
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@home', resolve('src/home'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
          options.compilerOptions = options.compilerOptions || {};
          options.compilerOptions.isCustomElement = tag => tag === 'iconpark-icon'
        // modify the options...
        return options
      })
  },
  configureWebpack: config => {
    if (isProdOrTest) {
      // 代码压缩去除console.log
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true, // true
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    }
  },
  devServer: {
    host: pageType == 'home' ? "localhost" : '0.0.0.0',
    port: '6090',
    open: true,
  }
}
