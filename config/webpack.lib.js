/**
 * Adapted from angular2-webpack-starter
 */

const helpers = require('./helpers'),
    webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

function ngExternal(ns) {
    var ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
}

module.exports = {
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: helpers.root('./index.ts'),

    output: {
        path: helpers.root('bundles'),
        publicPath: '/',
        filename: 'ng2-dropdown-treeview.umd.js',
        libraryTarget: 'umd',
        library: 'ng2-dropdown-treeview'
    },

    // require those dependencies but don't bundle them
    externals: {
        '@angular/core': ngExternal('core'),
        '@angular/common': ngExternal('common'),
        '@angular/forms': ngExternal('forms'),
        'lodash': {
            root: '_',
            commonjs2: 'lodash',
            commonjs: 'lodash',
            amd: 'lodash'
        }
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [helpers.root('node_modules')]
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader?declaration=false',
            exclude: [/\.e2e\.ts$/]
        }]
    },

    plugins: [
        // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src')
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        })
    ]
};