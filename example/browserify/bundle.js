(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ScopedCss = require("../../");

new ScopedCss("my-element", "h1, h2 { color: green; } h2 + b { color: red; }").process();

},{"../../":2}],2:[function(require,module,exports){
(function(window, factory) {
  "use strict";

  if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // enviroments that support module.exports, like Node.
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // Allow using this built library as an AMD module in another project. That
    // other project will only see this AMD call, not the internal modules in
    // the closure below.
    define([], factory);
  } else {
    // Browser globals case. Just assign the result to a property on the
    // global.
    window.ScopedCss = factory();
  }
}(this, function() {


  "use strict";

  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * var cssRule = new CssRule(rule, 0);
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} index What position the rule is at.
   */
  var CssRule = function(cssRule, index) {
    this.rule = cssRule;
    this.index = index;
  };

  /**
   * Breaks a selector down to its unique selectorText.
   *
   * Examples:
   *
   * cssRule.formatSelector(".prefix", "h1, h2 > *.red");
   *
   * @param  {String} prefix Unique selector to prefix to the unscoped
   *                  selector.
   * @param  {String} selector May contain one or many compound parts.
   * @return {String} The prefixed selector.
   */
  CssRule.prototype.formatSelector = function(prefix, selector) {
    return selector.split(", ").map(function(part) {
      return prefix + " " + part;
    }).join(", ");
  };

  /**
   * Browsers that incorrectly support the mutable selectorText property will
   * have to pass through this code path.  This method takes in the CSSRule
   * `cssText` property and augments each selector separately.
   *
   * Examples:
   *
   * cssRule.formatCssText(".prefix", "h1, h2 > *.red { color: red; }");
   *
   * @param  {String} prefix Unique selector to prefix to the unscoped
   *                  selector.
   * @param  {String} cssText Full from the CSSRule.
   * @return {String} The prefixed cssText.
   */
  CssRule.prototype.formatCssText = function(prefix, cssText) {
    var flip = 0;

    // Parse out all the selector rules and update using `formatSelector`.
    // The regular expression that splits on all opening { that are preceeded
    // by a closing }.
    return cssText.split(/ }\s?{/).map(function(selector) {
      // Only modify every other item.
      return (++flip % 2) ? this.formatSelector(prefix, selector) : selector;
    }, this).join(" }{");
  };

  /**
   * Facilitates the selectorText prefixing.  Pass in a prefix and the
   * internal structure will be modified.  Requires the CSSStyleSheet APIs.
   *
   * Description:
   *
   * Many browsers do not support directly modifying the `selectorText`
   * property.  The specified behavior is that the property should be mutable.
   *
   * Examples:
   *
   * cssRule.applyPrefix(".prefix");
   *
   * @param  {String} prefix Unique selector to prefix to the unscoped
   *                  selector.
   */
  CssRule.prototype.applyPrefix = function(prefix) {
    var selectorText = this.rule.selectorText;
    var parentStyleSheet = this.rule.parentStyleSheet;
    var cssText = this.rule.cssText;

    // Coerce to single quotes.
    selectorText = selectorText.replace(/\"/g, "'");

    // Don't scope if it's the same selector.
    if (selectorText.indexOf(prefix) !== 0) {
      // Attempt to directly modify the selector.
      this.rule.selectorText = this.formatSelector(prefix, selectorText);

      // The specification actually marks the above property to be mutable, but
      // only Chrome appears to implement it.  Below is a fallback that should
      // work in most browsers that support the StyleSheet API correctly.
      if (this.rule.selectorText === selectorText) {
        // Update the CSS text to account for the prefix.
        cssText = this.formatCssText(prefix, cssText);

        // Swap out the rule with the modified cssText.
        parentStyleSheet.deleteRule(this.index);
        parentStyleSheet.insertRule(cssText, this.index);
      }
    }
  };

  

  "use strict";

  /**
   * Wraps a native CSSStyleSheet object with methods that help access the
   * native sheet object and the associated CSSRule objects.
   *
   * Examples:
   *
   * var styleSheet = new StyleSheet(styleTag);
   *
   * @param {String} styleTag is a `<style>` tag to extract rules from.
   */
  var StyleSheet = function(styleTag) {
    this.styleTag = styleTag;

    if (!this.getStyleSheet()) {
      document.documentElement.appendChild(this.styleTag);
    }
  };

  /**
   * Accessor for the native sheet object.
   *
   * Examples:
   *
   * styleSheet.getStyleSheet();
   *
   * @return {CSSStyleSheet} The native StyleSheet object.
   */
  StyleSheet.prototype.getStyleSheet = function() {
    return this.styleTag.sheet;
  };

  /**
   * Iterates through all of the StyleSheet's native rule objects and replaces
   * each with a wrapped CssRule.
   *
   * Examples:
   *
   * var rules = styleSheet.cssRules();
   *
   * @return {Array} An array of CssRule objects.
   */
  StyleSheet.prototype.cssRules = function() {
    var rules = Array.prototype.slice.call(this.getStyleSheet().cssRules);

    return rules.map(function(rule, index) {
      return new CssRule(rule, index);
    });
  };

  

  "use strict";

  /**
   * The global construct for assembling scoped style sheets.  This shadows
   * the functionality within the library in a more convenient API.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "h1 { color: red; }");
   *
   * // Passing along your own styleTag element.
   * var scopedCss = new ScopedCss(".prefix", "h1 { color: red; }", styleTag);
   *
   * // Passing along only the prefix.
   * var scopedCss = new ScopedCss(".prefix");
   * // And assigning the cssText afterwards.
   * scopedCss.cssText = "h1 { color: red; }";
   *
   * @param  {String} prefix Unique selector to prefix to the unscoped
   *                  selector.
   * @param  {String} cssText Content to populate the `<style>` tag with.
   * @param  {HTMLStyleElement} styleTag Element containing styles to prefix.
   */
  var ScopedCss = function(prefix, cssText, styleTag) {
    this.prefix = prefix;
    this.cssText = cssText;

    // Default to an internal `<style>` tag if one wasn't passed.
    this.styleTag = styleTag || document.createElement("style");
  };

  // This is the default selector to look for when monitoring.
  ScopedCss.defaultSelector = ":not([data-scopedcss]) style[scoped]";

  // Attach the version information.
  ScopedCss.VERSION = "0.1.0";

  /**
   * This method replaces all instances of the host keyword with the passed in
   * prefix.
   *
   * Examples:
   *
   * scopedCss.prepare("@host { color: blue; }");
   *
   * @param  {String} cssText Derived from the style element `innerHTML`.
   * @return {String} Text prepared to be injected with `innerHTML`.
   */
  ScopedCss.prototype.prepare = function(cssText) {
    // Replace `@host` with the prefix.
    return cssText.replace(/@host/g, this.prefix);
  };

  /**
   * If the styleTag is empty this method will fill it with the prepared
   * cssText and apply the prefix to every rules.
   *
   * Examples:
   *
   * // Optionally pass along a prefix.
   * scopedCss.process(".prefix");
   *
   * @param  {String} prefix Optionally specify a prefix to use; this is useful
   *                  in preloaders who wish to expose a ScopedCss object and
   *                  not enforce setting the prefix property directly.
   */
  ScopedCss.prototype.process = function(prefix) {
    // If a prefix override was specified, reset it.
    if (prefix) {
      this.prefix = prefix;
    }

    // Only process the css text if it's provided.
    if (this.cssText) {
      this.styleTag.innerHTML = this.prepare(this.cssText);
    }

    var styleSheet = new StyleSheet(this.styleTag);
    var cssRules = styleSheet.cssRules();

    cssRules.forEach(function(rule) {
      rule.applyPrefix(this.prefix);
    }, this);
  };

  /**
   * Static method that processes a given element for any selectors that match
   * the default selector.  The default selector will find any style elements
   * that haven't already been prefixed and contain the scoped attribute.
   *
   * Examples:
   *
   * // Find all scoped style sheets under the body tag.
   * ScopedCss.applyTo(document.body);
   *
   * @param  {String} hostElement What element to find descendent scoped style
   *                  tags in.
   */
  ScopedCss.applyTo = function(hostElement) {
    // Default to the body element.
    hostElement = hostElement || document.body;

    // Query for all the scoped style tags that have not already been
    // processed, scope to the `hostElement`.
    var elements = hostElement.querySelectorAll(this.defaultSelector);

    // Coerce to an Array and iterate through each matched element.
    Array.prototype.slice.call(elements).forEach(function(element) {
      // Create a custom identifier for this element, since scoped doesn't
      // actually exist yet.
      var id = (new Date() * Math.random()).toString(16);
      element.parentNode.setAttribute("data-scopedcss", id);

      // Create a new scoped stylesheet that we will replace the existing with.
      new ScopedCss("[data-scopedcss='" + id + "']", null, element).process();
    });
  };

  return ScopedCss;
}));

},{}]},{},[1])