define(["./styleSheet"], function(StyleSheet) {
  "use strict";

  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "");
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} cssText What position the rule is at.
   * @param  {Element} styleTag A `<style>` element.
   */
  var ScopedCss = function(selectorPrefix, cssText, styleTag) {
    this.selectorPrefix = selectorPrefix;
    this.cssText = cssText;

    // Default to an internal `<style>` tag if one wasn't passed.
    this.styleTag = styleTag || document.createElement("style");
  };

  // This is the default selector to look for when monitoring.
  ScopedCss.defaultSelector = ":not([data-scopedcss]) style[scoped]";

  // Prepare cssText before pumping into a style tag.
  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "");
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} index What position the rule is at.
   */
  ScopedCss.prototype.prepare = function(cssText) {
    // Swap out the `@host` for the `tagName`.
    return cssText.replace(/\@host/g, this.selectorPrefix);
  };

  // Lets try and make this compatible with as many browsers as possible.
  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "");
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} index What position the rule is at.
   */
  ScopedCss.prototype.process = function(selectorPrefix) {
    // Temporary preprecossing code.
    if (this.styleTag.innerHTML.length) {
      this.styleTag.innerHTML = this.prepare(this.styleTag.innerHTML);
    }

    var styleSheet = new StyleSheet(this.styleTag);
    var cssRules = styleSheet.cssRules();

    cssRules.forEach(function(rule) {
      rule.applyPrefix(selectorPrefix || this.selectorPrefix);
    }, this);
  };

  // Place the internal style elemeent in whatever host element is provided.
  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "");
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} index What position the rule is at.
   */
  ScopedCss.prototype.appendTo = function(hostElement) {
    // Set the contents of the style tag which will be parsed.
    this.styleTag.innerHTML = this.cssText;

    // Add the style tag to the parent.
    hostElement.appendChild(this.styleTag);

    // If both the selectorPrefix and cssText are set, process the scope.
    if (this.selectorPrefix && this.cssText) {
      this.process();
    }
  };

  // This will process a given region containing scoped styles.
  /**
   * Wraps a native CSSRule object with methods that can augment its internal
   * selector.
   *
   * Examples:
   *
   * // Without passing a style tag.
   * var scopedCss = new ScopedCss(".prefix", "");
   *
   * @param  {String} cssRule Native CSSRule object.
   * @param  {String} index What position the rule is at.
   */
  ScopedCss.applyTo = function(hostElement) {
    // Default to the body element.
    hostElement = hostElement || document.body;

    // Query for all the scoped style tags that have not already been
    // processed.
    var elements = document.querySelectorAll(this.defaultSelector);

    // Coerce to an Array and iterate.
    Array.prototype.slice.call(elements).forEach(function(element) {
      // Create a custom identifier for this element, since scoped doesn't
      // actually exist yet.
      var id = (+new Date() * Math.random()).toString(16);
      element.parentNode.setAttribute("data-scopedcss", id);

      // Create a new scoped stylesheet that we will replace the existing with.
      new ScopedCss("[data-scopedcss='" + id +"']", null, element).process();
    });
  };

  return ScopedCss;
});
