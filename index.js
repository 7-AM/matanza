var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var htmlMinify = require('html-minifier').minify;
var through2 = require('through2');
var isThere = require("is-there");
var appRoot = require('app-root-dir').get();

module.exports = {
  minify: minify
};


function minify(options) {
  var files = [], destPath, filename;
  var config = {
    dest: './dist',
    source: [],
    concat: false,
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  };

  _.extend(config, options);

  destPath = path.join(appRoot, config.dest);

  files = config.source.reduce(function (result, file) {
    return result.concat(
      glob.sync(path.join(appRoot, file))
    );
  }, []);

  if (!isThere(destPath)) {
    fs.mkdirSync(destPath, '0776');
  }

  if (files.length === 1) {
    if (!isThere(files.join(''))) {
      console.log('File not found: ' + files.join(''));
      return;
    }

    if (fs.lstatSync(files.join('')).isDirectory()) {
      console.log('Source option must be a file');
      return;
    }
  }

  for (var i = 0, len = files.length; i < len; i++) {
    filename = files[i].split('/').pop();

    fs.createReadStream(files[i])
      .pipe(through2( minifyTransform ))
      .pipe(fs.createWriteStream(destPath + '/' + filename));
  }

  function minifyTransform(chunk, enc, callback) {
    var fileMinified = '';

    fileMinified = htmlMinify(chunk.toString(), {
      collapseWhitespace: config.minify.collapseWhitespace,
      removeComments: config.minify.removeComments
    });

    this.push(fileMinified);

    callback();
  }
}
