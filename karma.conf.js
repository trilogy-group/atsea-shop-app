const path = require('path');

module.exports = function(config) {
  config.set({
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes

    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true,
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/**/*.spec.js', watched: false }],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
      //      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    coverageReporter: {
      dir: 'coverage-reports',
      reporters: [{ type: 'lcov', subdir: 'report-lcov' }]
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: 'babel-loader'
          },
          {
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'src')],
            exclude: [path.resolve(__dirname, 'node_modules')],
            enforce: 'post',
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            }
          }
        ]
      }
    },
    client: {
      captureConsole: true
    },

    webpackServer: {
      noInfo: true
    },
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};