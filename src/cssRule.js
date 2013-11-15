define(function() {
  "use strict";

  // Single rule definition abstraction.
  var CssRule = function(cssRule, index) {
    this.rule = cssRule;
    this.index = index;
  };

  /**
   * Modifies a 
   *
   * Examples:
   *
   * AuthService.createPasswordHash("somePassword");
   * //=> n {promiseDispatch: function, valueOf: function, ...}
   *
   * @param  {String} password Password to be converted into a hash.
   * @return {Promise} A promise that represents the hashing success or failure.
   */
  CssRule.prototype.formatSelector = function(prefix, selectorText) {
    return selectorText.split(",").map(function(selector) {
      return prefix + " " + selector;
    }).join(",");
  };

  CssRule.prototype.formatCssText = function(prefix, cssText) {
    var flip = 0;

    // Parse out all the selector rules and update using `formatSelector`.
    return cssText.split(" {").map(function(selector) {
      // Only modify every other item.
      return (flip += 1) % 2 ? this.formatSelector : part;
    }, this).join(" {");
  };

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

  return CssRule;
});
