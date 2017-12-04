const merge = require('webpack-merge');

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');//将js自动插入到模板
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//压缩js
const CleanWebpackPlugin = require('clean-webpack-plugin');// 打包前清理dist文件夹
const ExtractTextPlugin = require("extract-text-webpack-plugin");//抽取css

const commonConfig = require('./webpack.common.config.js');
// webpack暴露的一个对象
const publicConfig = {
	devtool: 'cheap-module-source-map',
	// 入口	
	// entry: {
	// 	app: [
	// 		path.join(__dirname, 'src/index.js')
	// 	],
	// 	vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	// },

	plugins:[
		new UglifyJSPlugin(),// 打包压缩js
		// new webpack.HashedModuleIdsPlugin(),// 防止修改其他js文件打包时vendor的名字也跟着变化
		new CleanWebpackPlugin(['dist/*.*']),//清理dist文件
		// new HtmlWebpackPlugin({
		// 	filename: 'index.html',
		// 	template: path.join(__dirname, 'src/index.html')
		// }),
		//抽取css
		new ExtractTextPlugin({
	        filename: '[name].[contenthash:5].css',
	        allChunks: true
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor'
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'runtime'
		// }),
		// 指定环境
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	
	//输出到dist文件夹，文件名字为bundle.js
	// output: {
	// 	path: path.join(__dirname, './dist'),
	// 	publicPath: '/',
	// 	filename: '[name].[chunkhash].js',
	// 	chunkFilename: '[name].[chunkhash].js'// 除了入口文件的其他js文件
	// },

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
		        use: ExtractTextPlugin.extract({//单独抽取css
		          fallback: "style-loader",
		          use: ["css-loader", "postcss-loader"]
		        })
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

	//文件路径优化
	// resolve: {
	// 	alias: {
	// 		pages: path.join(__dirname, 'src/pages'),
	// 		component: path.join(__dirname, 'src/component'),
	// 		router: path.join(__dirname, 'src/router'),
	// 		actions: path.join(__dirname, 'src/redux/actions'),
 //            reducers: path.join(__dirname, 'src/redux/reducers')
	// 	}
	// },
}

module.exports = merge(commonConfig, publicConfig);