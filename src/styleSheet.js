var CssRule = require("./cssRule");

// Load in the stylesheet.
var StyleSheet = function(styleTag) {
  this.styleTag = styleTag;
};

StyleSheet.prototype.getStyleSheet = function() {
  return this.styleTag.sheet;
};

// Place the internal style elemeent in whatever host element is provided.
StyleSheet.prototype.cssRules = function() {
  var rules = Array.prototype.slice.call(this.getStyleSheet().cssRules);

  return rules.map(function(rule, index) {
    return new CssRule(rule, index);
  }, this);
};

module.exports = StyleSheet;
