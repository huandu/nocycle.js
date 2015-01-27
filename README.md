# Detect Cycle `require` #

`nocycle` is a tiny node module to detect cycle `require`. If a file `a.js` requires `b.js` while `b.js` also requires `a.js` directly or indirectly, `nocycle` will find the cycle.

## Install ##

Install this module through `npm`.

	npm install --save nocycle

## Usage ##

Simply call `detect` to start cycle detection.

```javascript
// start to detect cycle require after `detect` is called.
require('nocycle').detect();
```

If there is any cycle `require`, above code will print something like following.

	cycle require is detected. require stack is:
		* a.js
		  b.js
		* a.js
		  index.js

## API ##

* `detect([printer])`

Start to detect cycle require. If a cycle require is detected, printer will be called with current require stack.

Require stack is an array of required file absolute path names. Index 0 is the most recent required file path.

* `printer([logger])`

Generate a default printer function which writes output to logger.

If logger is provided, printer will call it once to print cycle require stack.

## Caveats ##

`nocycle` uses "black magic" to hack node.js' module loading process. It may be broken at anytime if node changes its implementation. Anyway, even if it's changed, there must be another black magic to implement it. I'll find out the way at that time.

## FAQ ##

**Q**: I use a third-party module which has cycle require inside its code. I don't want to print cycle require information for it. How can I whitelist it?

**A**: Require the module before `require('nocycle').detect()`.

For example, `request` has cycle require in one of its dependency. We need to write following code to whitelist `request`.

```javascript
require('request');          // whitelist this module.
require('nocycle').detect(); // start to detect cycle require.
```

## License ##

This module is licensed under the MIT license that can be found in the LICENSE file.
