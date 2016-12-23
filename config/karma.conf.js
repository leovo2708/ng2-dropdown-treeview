var webpackConfig = require('./webpack.test');

module.exports = function(config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine', 'fixture'],

        files: [
            { pattern: './mocks/**/*.json', watched: false },
            { pattern: './karma-test-shim.js', watched: false }
        ],

        preprocessors: {
            './mocks/**/*.json': ['json_fixtures'],
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },

        jsonFixturesPreprocessor: {
            stripPrefix: 'mocks',
            variableName: '__json__'
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'], // select Chrome or PhantomJS
        singleRun: true
    };

    config.set(_config);
};