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
      'karma-coverage-istanbul-reporter',
      'karma-htmlfile-reporter'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
      //      'tests.webpack.js': ['webpack', 'sourcemap']
    },


    coverageIstanbulReporter: {      
      reports: ['cobertura', 'text-summary'] 
    },
    reporters: ['progress', 'coverage-istanbul','html'],
    htmlReporter: {
      outputFile: 'tests/units.html',
            
      // Optional
      pageTitle: 'JavaScript test run results',
      subPageTitle: '',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(bower_components|node_modules|__tests__)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env'].map(require.resolve),
                plugins: ['@babel/plugin-proposal-class-properties'].map(require.resolve)
              }
            }
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules|\.spec\.js$/,
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