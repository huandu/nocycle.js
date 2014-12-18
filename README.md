# Detect Cycle `require` In Code #

`nocycle` is a tiny node module to detect cycle `require`. If a file `a.js` requires `b.js` and `b.js` also requires `a.js` directly or indirectly, `nocycle` will find the cycle and report it.

It's extremely simple to use it.

First, install this node module.

	npm install --save nocycle

Then, require it and call `detect` when cycle detection is needed.

```javascript
var path = require('path');

require('nocycle').detect(function(stack) {
	var top = path.relative(basedir, stack[0]);
    console.log('cycle require is detected. require stack is:');

    // print require stack. mark the file causes problem.
    console.log(stack.map(function(s) {
        s = path.relative(basedir, s);
        return '\t' + (s === top? '* ': '  ') + s;
    }).join('\n'));
});
```

If there is any cycle require, this code will print something like following.

	cycle require is detected. require stack is:
		* a.js
		  b.js
		  a.js

*Caveat*: `nocycle` uses "black magic" to hack node.js' module loading process. It may be broken at anytime if node changes its implementation. Anyway, even if it's changed, there must be another black magic to implement it. I'll find out the way at that time.

This module is licensed under the MIT license that can be found in the LICENSE file.