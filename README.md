# Detect Cycle `require` #

`nocycle` is a tiny node module to detect cycle `require`. If a file `a.js` requires `b.js` while `b.js` also requires `a.js` directly or indirectly, `nocycle` will find the cycle.

It's extremely simple to use it.

First, install this node module.

	npm install --save nocycle

Then, require it and call `detect` to start detecting cycle `require`.

```javascript
var path = require('path');

// start to detect cycle require after `detect` is called.
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

If there is any cycle `require`, above code will print something like following.

	cycle require is detected. require stack is:
		* a.js
		  b.js
		* a.js
		  index.js

*Caveat*: `nocycle` uses "black magic" to hack node.js' module loading process. It may be broken at anytime if node changes its implementation. Anyway, even if it's changed, there must be another black magic to implement it. I'll find out the way at that time.

This module is licensed under the MIT license that can be found in the LICENSE file.