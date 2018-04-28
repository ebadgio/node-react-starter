const common = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')})
    ]
});