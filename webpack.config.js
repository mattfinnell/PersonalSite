var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry : "./website/static/js/script.js",
	output : {
		filename : "./website/static/js/bundle.js"
	},
	module : {
		rules : [
			{
				test : /\.scss$/,
        // include : ["https://fonts.googleapis.com/css?family=Source+Sans+Pro:300"],
				use : ExtractTextPlugin.extract({
					fallback : 'style-loader',
					use : [
						'css-loader',
						'sass-loader'
					]
				})
			}
		]
	},
	plugins : [
		new ExtractTextPlugin('./website/static/css/style.css')
	]
};
