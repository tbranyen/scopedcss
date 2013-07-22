var StyleSheet = require("./styleSheet");

// The selectorPrefix is the selector to prefix all style rules with.  The
// cssText is simply the raw CSS to process.  The styleTag is useful to pass
// if you already have created it already and need to augment.  All of these
// constructor arguments are optional.  You can set them at any time.
var ScopedCss = function(selectorPrefix, cssText, styleTag) {
  this.selectorPrefix = selectorPrefix;
  this.cssText = cssText;

  // Default to an internal <style> tag if one wasn't passed.
  this.styleTag = styleTag || document.createElement("style");
};

// Lets try and make this compatible with as many browsers as possible.
ScopedCss.prototype.process = function() {
  var styleSheet = new StyleSheet(this.styleTag);
  var cssRules = styleSheet.cssRules();

  cssRules.forEach(function(rule) {
    rule.applyPrefix(this.selectorPrefix);
  }, this);
};

// Place the internal style elemeent in whatever host element is provided.
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

// This is the default selector to look for when monitoring.
ScopedCss.defaultSelector = ":not([data-scopedcss]) style[scoped]";

// This will process a given region containing scoped styles.
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
    var id = (+new Date()).toString(16);
    element.parentNode.setAttribute("data-scopedcss", id);

    // Create a new scoped stylesheet that we will replace the existing with.
    new ScopedCss("[data-scopedcss='" + id +"']", null, element).process();
  });
};

module.exports = ScopedCss;
