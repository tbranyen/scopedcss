define(["./cssRule"], function(CssRule) {
  "use strict";

  /**
   * Wraps a native CSSStyleSheet object with methods that help access the
   * native sheet object and the associated CSSRule objects.
   *
   * Examples:
   *
   * var styleSheet = new StyleSheet(styleTag);
   *
   * @param  {String} A `<style>` tag to extract rules from.
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

  return StyleSheet;
});
