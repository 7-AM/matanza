#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');
var minify = require('html-minifier').minify;
var through2 = require('through2');
var findit = require('findit');
var glob = require('glob');
var isThere = require("is-there");
var filename, fileMinified, filepath, destination;

program
  .version('1.0.0')
  .usage('[options] <DIR ...>')
  .option('-s, --source <dir>', 'Source directory', handleGlogFromCommander, '-s')
  .option('-d, --destination <dir>', 'Destination directory', handleGlogFromCommander, '-d')
  .parse(process.argv);


function handleGlogFromCommander(data, type) {
  var sourceIdx = program.rawArgs.indexOf('-s') + 1;
  var destIdx = program.rawArgs.indexOf('-d');
  var source = [];

  if (type === '-s') {
    for (var i = sourceIdx, len = destIdx; i < len; i++) {
      source.push(program.rawArgs[i]);
    }
  } else if (type === '-d') {
    for (var j = destIdx + 1, length = program.rawArgs.length; j < length; j++) {
      source.push(program.rawArgs[j]);
    }
  }

  return source;
}

function isValid() {
  return program.source.length > 0 && program.destination.length > 0;
}

if (isValid()) {

  if (program.source.length === 1) {
    var sourcepath = path.resolve(__dirname, program.source.join(''));

    if (!isThere(sourcepath)) {
      console.log('File not found: ' + program.source.join(''));
      return;
    }

    if (fs.lstatSync(sourcepath).isDirectory()) {
      console.log('Source option must be a file');
      return;
    }

  }

  if (!isThere(path.resolve(__dirname, program.destination.join('')))) {
    console.log('Destination folder not found: ' + program.destination);
    return;
  }

  destination = path.resolve(__dirname, program.destination.join(''));

  for (var i = 0, len = program.source.length; i < len; i++) {

    filepath = path.resolve(__dirname, program.source[i]);
    filename_arr = path.normalize(program.source[i]).split('/');
    filename = filename_arr[filename_arr.length-1];

    fs.createReadStream(filepath)
    .pipe(through2( minifyTransform ))
    .pipe(fs.createWriteStream(destination + '/' + filename));

  }
}
else {
  console.log('Source option (-s) and Destination option (-d) are mandatory');
  return;
}

function minifyTransform(chunk, enc, callback) {
  fileMinified = minify(chunk.toString(), {
    collapseWhitespace: true,
    removeComments: true
  });

  this.push(fileMinified);

  callback();
}
