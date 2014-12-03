ScopedCSS
---------

**Stable: 0.1.4**

[![Build
Status](https://travis-ci.org/tbranyen/scopedcss.png?branch=master)](https://travis-ci.org/tbranyen/scopedcss) [![Coverage Status](https://coveralls.io/repos/tbranyen/scopedcss/badge.png)](https://coveralls.io/r/tbranyen/scopedcss)

Maintained by Tim Branyen [@tbranyen](http://twitter.com/tbranyen).

Part of the HTML 5 specification is the ability to specify CSS relative to a
host element.  It is virtually unsupported across all browsers.  As we move
towards a more component driven architecture, it is useful to be able to
completely isolate CSS to a specific region.

[Specification
as-is...](http://dev.w3.org/html5/spec-preview/the-style-element.html#attr-style-scoped)

This script is useful to embed into your own Views or framework to allow any
arbitrary CSS to be prefixed to a given selector.  It is also wrapped into a
convenient RequireJS loader plugin for reletive inclusion of CSS and scoping.

### Installing with Bower. ###

``` bash
bower install scopedcss
```

Alternatively you can download the `scopedcss.js` file and place anywhere in
your project.

### Using. ###

This library is built with a UMD header, meaning that it can be generally
consumed by any of the popular module loaders that support: AMD, CJS, or
globals.  This includes RequireJS and Browserify.

#### With Markup. ####

To include in your project, simply use a single script tag:

``` markup
<script src="scopedcss.js"></script>
```

#### With RequireJS. ####

``` javascript
require.config({
  paths: {
    "scopedcss": "path/to/scopedcss"
  }
});

require(["scopedcss"], function(ScopedCss) {

});
```

### Prefixing a string of CSS. ###

To prefix a string of CSS with a selector.

``` javascript
var cssText = "h1 { color: black; }";

// Prefix the CSS and extract the new contents.
var prefixed = new ScopedCss(".prefix", cssText).styleTag.innerHTML;
```

### Prefixing a style element. ###

To prefix an existing style element.

``` javascript
// Find the first style tag.
var styleTag = document.querySelector("style");

// Create the ScopedCss wrapped instance.
var scopedCss = new ScopedCss(".prefix", null, styleTag);

// Prefix the CSS.
scopedCss.process();
```

### Apply all `scoped` style tags in a given element. ###

If you want to apply to all nested scoped style elements.

``` javascript
// Get access to an element.
var elem = document.querySelector(".content");

// Find all nested <style scoped> tags and process them.
ScopedCss.applyTo(elem);
```

### Building. ###

``` bash
# Install local dependencies.
npm install

# Install `grunt-cli` globally if you haven't already.
npm install -g grunt-cli

# Run `grunt` to generate a new scopedcss.js file in the root.
grunt
```

### Contributing. ###

Please read and follow the [contribution
guide](https://github.com/tbranyen/scopedcss/blob/master/CONTRIBUTING.md)
before contributing.

**Running the unit tests in the browser**

Open `test/index.html` in your favorite browser to ensure ScopedCSS works
as expected.
