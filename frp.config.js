'use strict';
// https://github.com/frontainer/frontplate-cli/wiki/6.%E8%A8%AD%E5%AE%9A
const webpack = require("webpack");
const metadata = require("./conf/metadata.json");
const components = require("./conf/components.json");
const pages = require("./conf/pages.json");

module.exports = function(production) {
  global.FRP_SRC = 'src';
  global.FRP_DEST = 'public';
  return {
    clean: {},
    html: {
      src: 'src/view/**/*.ejs',
      rules: {
        "tagname-lowercase": false,
        "attr-lowercase": false,
        "attr-value-double-quotes": true,
        "attr-value-not-empty": false,
        "attr-no-duplication": true,
        "doctype-first": false,
        "tag-pair": true,
        "tag-self-close": false,
        "spec-char-escape": true,
        "id-unique": true,
        "src-not-empty": true,
        "head-script-disabled": false,
        "img-alt-require": true,
        "doctype-html5": true,
        "id-class-value": false,
        "style-disabled": false,
        "space-tab-mixed-disabled": true,
        "id-class-ad-disabled": true,
        "href-abs-or-rel": false,
        "attr-unsafe-chars": true
      },
      params: {
        siteComponents: components,
        sitePages: pages,
        metadata: (() => {
          if (production) {
            return metadata;
          }
          return Object.assign({}, metadata, {
            baseUrl: 'localhost:3000'
          });
        })(),
      }
    },
    style: production ? {
      src: 'src/**/*.scss',
      dest: 'public/assets',
      outputStyle: 'compressed',
      plugins: [
        require('autoprefixer')({
          // autoprefixer(https://github.com/postcss/autoprefixer)
          browsers: [
            'last 3 version',
            'Android >= 4.2'
          ]
        })
      ],
    } : {
      src: 'src/**/*.scss',
      dest: 'public/assets',
      outputStyle: 'expanded',
      plugins: [
        require('autoprefixer')({
          // autoprefixer(https://github.com/postcss/autoprefixer)
          browsers: [
            'last 3 version',
            'Android >= 4.2'
          ]
        })
      ],
    },
    script: production ? {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
            screw_ie8: true,
            keep_fnames: true
          },
          compress: {
            warnings: false,
            screw_ie8: true
          },
          comments: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
            babel: {
              presets: ["es2015"]
            }
          }
        }),
        new webpack.ProvidePlugin({
          jQuery: "jquery",
          $: "jquery",
          jquery: 'jquery'
        })
      ]
    } : {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            babel: {
              presets: ["es2015"]
            }
          }
        }),
        new webpack.ProvidePlugin({
          jQuery: "jquery",
          $: "jquery",
          jquery: 'jquery'
        })
      ]
    },
    server: {},
    copy: {},
    sprite: [],
    test: {}
  }
};
