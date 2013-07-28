ScopedCSS
=========

**v0.1.0-pre** [![Build
Status](https://travis-ci.org/tbranyen/scopedcss.png?branch=master)](https://travis-ci.org/tbranyen/scopedcss)

Maintained by Tim Branyen [@tbranyen](http://twitter.com/tbranyen).

Part of the HTML 5 specification is the ability to specify CSS relative to a
host element.  It is virtually unsupported across all browsers.

[Specification
as-is...](http://dev.w3.org/html5/spec-preview/the-style-element.html#attr-style-scoped)

This script is useful to embed into your own Views or framework to allow any
arbitrary CSS to be prefixed to a given selector.

## Getting started ##

## Parsing a string of CSS. ##

## Parsing a style element. ##

## Apply all `scoped` style tags in a given element. ##

## Building ##

``` bash
# Install local dependencies.
npm install -q

# Install `grunt-cli` globally if you haven't already.
npm install grunt-cli -gq 

# Run Grunt if you want to see how the build works.
grunt
```

## Contributing ##

Please read and follow the [contribution
guide](https://github.com/tbranyen/scopedcss/blob/master/contributing.md)
before contributing.

**Running the unit tests in the browser**

Open `test/index.html` in your favorite browser to ensure ScopedCSS works
as expected.
