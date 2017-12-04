const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

// webpack暴露的一个对象
const devConfig = {
	// 入口	
	entry: {
		app: [
			"babel-polyfill",
			'react-hot-loader/patch',
			path.join(__dirname, 'src/index.js')
		],
		// vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},

	// plugins:[
	// 	new HtmlWebpackPlugin({
	// 		filename: 'index.html',
	// 		template: path.join(__dirname, 'src/index.html')
	// 	}),
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: 'vendor'
	// 	})
	// ],

	plugins: [
		new webpack.DefinePlugin({
            MOCK: true
        })
	],
	
	//输出到dist文件夹，文件名字为bundle.js
	output: {
		// path: path.join(__dirname, './dist'),
		filename: '[name].[hash].js',
		// chunkFilename: '[name].[chunkhash].js'// 除了入口文件的其他js文件
	},

	module: {
		/*src文件夹下面的以.js结尾的文件，要使用babel解析*/
		/*cacheDirectory是用来缓存编译结果，下次编译加速*/
		rules: [
			// {
			// 	test: /\.js$/,
			// 	use: ['babel-loader?cacheDirectory=true'],
			// 	include: path.join(__dirname, 'src')
			// },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			// {
			// 	test:/\.(png|jpg|gif)$/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			limit: 8192// 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。 
			// 		}
			// 	}]
			// }
		]
	},

	//静态服务器
	devServer: {
		contentBase: 'dist',
		historyApiFallback: true,// 任意的404响应都被替代为index.html
		// port: 8080,
		// inline: true,
		host: '0.0.0.0'// 服务器外部可以访问,比如用手机ip访问
	},

	//文件路径优化
	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			component: path.join(__dirname, 'src/component'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
		}
	},

	devtool: 'inline-source-map'//错误信息更加详细
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);