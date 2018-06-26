const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: !prod,
  build: {
    web: {}
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    sass: {
      outputStyle: 'compact'
    },
    babel: {
      sourceMap: false,
      presets: [
        'env',
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {
    autoprefixer: {
      filter: /\.(wxss|css)$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    },
    replace: {
      filter: /\.js$/,
      config: {
        find: /BASE_API/,
        replace: function (matchs, word) {
          var api = ''
          if (process.env.env_config == 'dev') {
            api = '"https://api.a.com/"'
          }
          if (process.env.env_config == 'test') {
            api = '"https://api.test.com/"'
          }
          return api
        }
      }
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  module.exports.compilers['sass'] = {
    outputStyle: 'compact'
  };

  // 压缩js
  module.exports.plugins = {
    autoprefixer: {
      filter: /\.(wxss|css)$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    },
    // 配置多参数环境
    replace: {
      filter: /\.js$/,
      config: {
        find: /BASE_API/g,
        replace: function (matchs, word) {
          var api = ''
          if (process.env.env_config == 'dev') {
            api = '"https://api.a.com/"'
          }
          if (process.env.env_config == 'test') {
            api = '"https://api.test.com/"'
          }
          return api
        }
      }
    },
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    filemin: {
      filter: /\.(wxml)$/
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}