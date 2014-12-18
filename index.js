/**
 * Copyright 2015 Huan Du. All rights reserved.
 * Licensed under the MIT license that can be found in the LICENSE file.
 */
"use strict";

var _require = module.__proto__.require;
var _resolve = module.constructor._resolveFilename;
var _errorHandler = function(stack, fileMap) {};
var _fileMap = {};
var _requireStack = [];

/**
 * If there is a recursive require, say a.js requires b.js while b.js also requires a.js,
 * the cb will be called with a require stack.
 * @param {Function} cb function(stack, fileMap)
 */
exports.detect = function(cb) {
    // hacking default require.
    if (checkedRequire !== module.__proto__.require) {
        module.__proto__.require = checkedRequire;
    }

    _errorHandler = cb || function() {};
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
