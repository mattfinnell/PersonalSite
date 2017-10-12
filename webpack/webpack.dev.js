const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer : {
        stats : {
            modules : false,
            children : false
        }
    }
});
