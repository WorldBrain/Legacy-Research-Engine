(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var info = require('./lib/info.js'),
  extract = require('./lib/extract-text.js'),
  fs = require('fs');

function PDF() {
  if (false === (this instanceof PDF)) {
    return new PDF();
  }
}


PDF.prototype.info = function(pdf_path, cb) {

  fs.exists(pdf_path, function(exist) {
    if (!exist) return cb('no file exists at the path you specified');
    info.process(pdf_path, cb);
  });
}
PDF.prototype.pdfToText = function(pdf_path, options, cb) {

  fs.exists(pdf_path, function(exist) {
    if (!exist) return cb('no file exists at the path you specified');
    extract.process(pdf_path, options, cb);
  });
}


module.exports = new PDF();
},{"./lib/extract-text.js":2,"./lib/info.js":3,"fs":4}],2:[function(require,module,exports){
var spawn = require('child_process').spawn;

/**
 * Extract text from pdf using pdftotext external program
 * @param  String  pdf_path absolute path to pdf
 * @param  Object   options  {from: 1, to: 23}
 * @param  Function callback with params (err, output)
 * @return {[type]}            [description]
 */
module.exports.process = function(pdf_path, options, callback) {
  
  var args = [];
  if (typeof options !== 'function') {
    if (options && options.from && !isNaN(options.from)) {
      args.push('-f');
      args.push(options.from)
    };
    if (options && options.to && !isNaN(options.to)) {
      args.push('-l');
      args.push(options.to)
    };
  } else {
    callback = options;
  }



  args.push('-layout');
  args.push(pdf_path);
  args.push('-');

  var child = spawn('pdftotext', args);

  var stdout = child.stdout;
  var stderr = child.stderr;
  var output = '';

  stdout.setEncoding('utf8');
  stderr.setEncoding('utf8');

  stderr.on('data', function(data) {
    return callback(data, null);
  });

  // buffer the stdout output
  stdout.on('data', function(data) {
    output += data;
  });

  stdout.on('close', function(code) {
    if (code) {
      callback('pdftotext end with code ' + code, null);
    }
    callback(null, output);

  });
};
},{"child_process":4}],3:[function(require,module,exports){
var spawn = require('child_process').spawn;
/**
 * Extract info for pdf using pdfinfo external program
 * and parse the result to object
 *
 * @param  String  pdf_path absolute path to pdf
 * @param  Function callback with params (err, output)
 * @return void
 */
module.exports.process = function(pdf_path, callback) {
  var child = spawn('pdfinfo', ['-box', pdf_path]);

  var stdout = child.stdout;
  var stderr = child.stderr;
  var output = '';

  stdout.setEncoding('utf8');
  stderr.setEncoding('utf8');

  stderr.on('data', function(data) {
    console.log('data ' + data)
    return callback(data, null);
  });

  // buffer the stdout output
  stdout.on('data', function(data) {
    output += data;
  });

  stdout.on('close', function(code) {
    if (code) {
      callback('pdfinfo end with code ' + code, null);
    }
    output = convertOutputToObject(output);
    callback(null, output);
  });
};
/**
 * convert output to object key value
 * @param  String output
 *
 * @return Object key value
 */
function convertOutputToObject(output) {
  var result = {};
  //split by line
  var lines = output.split(/\n/g);
  for (var i = 0; i < lines.length; i++) {
    //split by first ":"
    var line = lines[i].split(':');

    if (line.length < 2) continue;

    var key = line[0].trim().toLowerCase().replace(/ /g, "_");
    var value = "";
    for (var j = 1; j < line.length; j++) {
      if (j + 1 < line.length) {
        value += line[j].trim() + ":";
      } else {
        value += line[j].trim();
      }

    }
    if (value !== "" && !isNaN(value)) {
      value = parseFloat(value);
    } else if (value !== "" && !isNaN(Date.parse(value))) {
      value = Date.parse(value);
    }
    result[key] = value;
  }
  return result;
}
},{"child_process":4}],4:[function(require,module,exports){

},{}]},{},[1]);
