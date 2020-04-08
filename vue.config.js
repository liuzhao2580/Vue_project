const { title: defatulConfig } = require('./src/setting')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
// 设置 项目名称
const name = defatulConfig
console.log(process.env.VUE_APP_BASE_API)
// 设置项目的端口号
const port = 9527
module.exports = {
	publicPath: './',
	outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'test',
	assetsDir: '',
	indexPath: 'index.html',
	filenameHashing: true,
	lintOnSave: process.env.NODE_ENV === 'development',
	//   lintOnSave: false,
	runtimeCompiler: false,
	transpileDependencies: [],
	productionSourceMap: false,
	integrity: false,
	// webpack 简单配置
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		externals: {
			vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			'element-ui': 'ELEMENT',
			AMap: 'AMap',
			AMapUI: 'AMapUI',
			mavonEditor: 'mavonEditor'
		}
	},
	devServer: {
		port: port,
		open: true,
		https: false,
		overlay: {
			warnings: true,
			errors: true
		},
		// 配置跨域
		proxy: {
			// 定义代理的名称
			[`/api/v1`]: {
				target: process.env.VUE_APP_BASE_URL,
				changeOrigin: true, // 是否启动代理
				// 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
				pathRewrite: {
					[`^/api/v1`]: `/api/v1`
				}
			}
		}
	},
	// webpack 高级配置
	chainWebpack(config) {
		// set svg-sprite-loader
		// 设置 svg 导入
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
	}
}
