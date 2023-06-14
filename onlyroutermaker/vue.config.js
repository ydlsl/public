var path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩插件
const TerserPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const ServerSign = process.argv[6] || 'home' // 本地运行 时候的标记 模式 --type 不可减少
let type = process.argv[5] || 'home' // 当前打包demo还是;
let run = process.argv[2] || 'home' // 当前serve还是build;

console.log(`111 ${run}===type ==${type} - ${process.env.NODE_ENV} ServerSign ==${ServerSign} `)

const modular = ['demo', 'lateral', 'panorama', 'home', 'faceFP', 'profile', 'smile', 'intraoral']
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
        entry: `src/${item}/main`,
        ...commonConfig,
        title: `ly-routermaker-${item}-${new Date().toLocaleString()}`,
        chunks: ["chunk-vendors", "chunk-common", `${item}`]
      }
    }
    pagesMap[item] = target
  })

  let page = {}
  if (process.env.NODE_ENV == 'development') {
    let pageType = ServerSign
    page = pagesMap[pageType] || pagesMap['demo']
  } else {
    page = pagesMap[type] || pagesMap['demo']
  }
  return page;
}

function setOutputDir() {
  const dirMap = {}
  modular.map(item=>{
    dirMap[`${item}`] = `Publish/${item}`
  })

  var outputDir = dirMap[type] || 'Publish/Debug'

  return outputDir
}

module.exports = {
  lintOnSave: false, //eslint验证
  publicPath: './',
  // outputDir: process.env.NODE_ENV == 'development' ? 'Publish/Debug' : setOutputDir(),
  outputDir: setOutputDir(),
  pages: setPage(), //页面配置
  filenameHashing: true,
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  chainWebpack:(config)=>{
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
    if (process.env.NODE_ENV === 'production') {
      // 代码压缩去除console.log
      // config.plugins.push(
      //   new TerserPlugin({
      //     terserOptions: {
      //       ecma: undefined,
      //       warnings: false,
      //       parse: {},
      //       compress: {
      //         drop_console: true, // true
      //         drop_debugger: false,
      //         pure_funcs: ['console.log'] // 移除console
      //       }
      //     }
      //   })
      // )
    }
    // 规则配置 no use
    config.module.rules.push(
      {
        test: /\.wasm$/,
        loader: 'wasm-loader'
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true
            }
          }
        }
      }
    )

    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin(
        {
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip',
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          // deleteOriginalAssets: false // 删除原文件
        }
      )
    )
  },
  devServer: {
    port: '9090',
    open: true,
  }
}
