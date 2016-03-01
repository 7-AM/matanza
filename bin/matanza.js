#!/usr/bin/env node

var program = require('commander');
var matanza = require('../index.js');

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
  matanza.minify({
    source: program.source,
    dest: program.destination.join('')
  });
}
else {
  console.log('Source option (-s) and Destination option (-d) are mandatory');
  return;
}
