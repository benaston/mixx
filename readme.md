# mixx

Adds object methods to the prototype of a function, or as own-properties on an object.

File size: **746 bytes**.<br/>
Supported platforms: **server and browser**.<br/>
Supported language versions: **ES3 and above**.

Also supports mixing of getter and setter properties when run within ES5 compliant systems.

Ignores null and undefined property sources.

If you use this library in your software please tweet me @benastontweet.

## Installation

```npm install mixx```

## Example

```javascript
var mix = require('mixx').mix;

function Foo() {}
Foo.prototype.foo = function(){};

function Bar() {}
Bar.prototype.bar = function(){};

function Foobar() {}

mix(Foobar, Foo.prototype, Bar.prototype);

for(var v in Foobar.prototype) {
	console.log(v);
} // foo bar
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.