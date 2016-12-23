var webpack = require('webpack');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss', '.html'],
        plugins: [
            new TsConfigPathsPlugin( /* { tsconfig, compiler } */ )
        ]
    },

    module: {
        loaders: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.(html|css|scss)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: 'null-loader'
            },
            {
                test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg|gif)(\?.*$|$)/,
                loader: 'null-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src')
        )
    ]
};