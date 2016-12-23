var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var helpers = require('../../config/helpers');

module.exports = {
    entry: {
        'polyfills': './demo/src/polyfills.ts',
        'vendor': './demo/src/vendor.ts',
        'app': './demo/src/main.ts',
        'style': [
            './node_modules/font-awesome/scss/font-awesome.scss',
            './demo/src/shared/style/common.scss'
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss', '.html'],
        plugins: [
            new TsConfigPathsPlugin({
                tsconfig: './demo/tsconfig.json'
            })
        ]
    },

    module: {
        loaders: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?configFileName=./demo/tsconfig.json', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(html|css|scss)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg|gif)(\?.*$|$)/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src')
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ]
};