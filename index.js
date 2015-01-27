/**
 * Copyright 2015 Huan Du. All rights reserved.
 * Licensed under the MIT license that can be found in the LICENSE file.
 */
"use strict";

var path = require('path');
var basedir = path.dirname(require.main.filename);

var _require = module.__proto__.require;
var _resolve = module.constructor._resolveFilename;
var _errorHandler = function(stack, fileMap) {};
var _fileMap = {};
var _requireStack = [];

/**
 * Start to detect cycle require.
 * If there is a cycle require, say a.js requires b.js while b.js also requires a.js,
 * the printer will be called with a require stack.
 * @param {Function} printer function(stack, fileMap)
 */
exports.detect = function(printer) {
    // hacking default require.
    if (checkedRequire !== module.__proto__.require) {
        module.__proto__.require = checkedRequire;
    }

    _errorHandler = printer || exports.printer();
};

/**
 * Generate a printer function for detect.
 * This printer can print require stack as following.
 *
 *     cycle require is detected. require stack is:
 *         * a.js
 *           b.js
 *         * a.js
 *
 * @param {Function} [logger] optional logger function. console.log is used by default.
 */
exports.printer = function(logger) {
    logger = logger || console.log;

    return function(stack) {
        var top = path.relative(basedir, stack[0]);
        var prefix = 'cycle require is detected. require stack is:\n';

        // print require stack. mark the file causes problem.
        logger(prefix + stack.map(function(s) {
            s = path.relative(basedir, s);
            return '\t' + (s === top? '* ': '  ') + s;
        }).join('\n'));
    };
};

function checkedRequire(name) {
    var m = this;
    var filename = _resolve(name, m);

    _requireStack.push(filename);

    if (_fileMap.hasOwnProperty(filename)) {
        // found cycle require.
        if (!_fileMap[filename]) {
            _errorHandler(_requireStack.slice().reverse(), _fileMap);
        }
    } else {
        _fileMap[filename] = false;
    }

    var r = _require.call(m, name);

    _requireStack.pop();
    _fileMap[filename] = true;
    return r;
}
