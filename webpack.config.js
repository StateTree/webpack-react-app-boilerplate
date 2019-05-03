const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
	context: path.join(__dirname, "./src/"),
	output: path.join(__dirname, "./dist/"),
	entry: {
    	app:"./index.js"
	}
};



const config = {
	mode: 'development',
	context: paths.context,
	entry: paths.entry,
	output: {
		path: paths.output,
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './src',
		hot: true,
		compress: true,
		port: 3001
	},
};

module.exports = config;
