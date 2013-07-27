define(function() {

  // Single rule definition abstraction.
  var CssRule = function(cssRule, index) {
    this.rule = cssRule;
    this.index = index;
  };

  CssRule.prototype.applyPrefix = function(prefix) {
    var selectorText = this.rule.selectorText;
    var parentStyleSheet = this.rule.parentStyleSheet;
    var cssText = this.rule.cssText;

    // Coerce to single quotes.
    selectorText = selectorText.replace(/\"/g, "'");

    // Don't scope
    if (prefix !== selectorText) {
      this.rule.selectorText = prefix + " " + selectorText;
    }

    if (this.rule.selectorText === selectorText) {
      parentStyleSheet.deleteRule(this.index);
      parentStyleSheet.insertRule(prefix + " " + cssText, this.index);
    }
  };

  return CssRule;

});
