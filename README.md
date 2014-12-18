# nocycle - No More Cycle Require In Your Code #

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

This module is licensed under the MIT license that can be found in the LICENSE file.