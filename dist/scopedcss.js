(function(e){if("function"==typeof bootstrap)bootstrap("scopedcss",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeScopedCss=e}else"undefined"!=typeof window?window.ScopedCss=e():global.ScopedCss=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){var StyleSheet = require("./styleSheet");

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

})()
},{"./styleSheet":2}],2:[function(require,module,exports){
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

},{"./cssRule":3}],3:[function(require,module,exports){
// Single rule definition abstraction.
var CssRule = function(cssRule, index) {
  this.rule = cssRule;
  this.index = index;
};

CssRule.prototype.applyPrefix = function(prefix) {
  var selectorText = this.rule.selectorText;
  var parentStyleSheet = this.rule.parentStyleSheet;
  var cssText = this.rule.cssText;

  this.rule.selectorText = prefix + " " + selectorText;

  if (this.rule.selectorText === selectorText) {
    parentStyleSheet.deleteRule(this.index);
    parentStyleSheet.insertRule(prefix + " " + cssText, this.index);
  }
};

module.exports = CssRule;

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS90aW0vZ2l0L3Njb3BlZGNzcy9zcmMvaW5kZXguanMiLCIvaG9tZS90aW0vZ2l0L3Njb3BlZGNzcy9zcmMvc3R5bGVTaGVldC5qcyIsIi9ob21lL3RpbS9naXQvc2NvcGVkY3NzL3NyYy9jc3NSdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7dmFyIFN0eWxlU2hlZXQgPSByZXF1aXJlKFwiLi9zdHlsZVNoZWV0XCIpO1xuXG4vLyBUaGUgc2VsZWN0b3JQcmVmaXggaXMgdGhlIHNlbGVjdG9yIHRvIHByZWZpeCBhbGwgc3R5bGUgcnVsZXMgd2l0aC4gIFRoZVxuLy8gY3NzVGV4dCBpcyBzaW1wbHkgdGhlIHJhdyBDU1MgdG8gcHJvY2Vzcy4gIFRoZSBzdHlsZVRhZyBpcyB1c2VmdWwgdG8gcGFzc1xuLy8gaWYgeW91IGFscmVhZHkgaGF2ZSBjcmVhdGVkIGl0IGFscmVhZHkgYW5kIG5lZWQgdG8gYXVnbWVudC4gIEFsbCBvZiB0aGVzZVxuLy8gY29uc3RydWN0b3IgYXJndW1lbnRzIGFyZSBvcHRpb25hbC4gIFlvdSBjYW4gc2V0IHRoZW0gYXQgYW55IHRpbWUuXG52YXIgU2NvcGVkQ3NzID0gZnVuY3Rpb24oc2VsZWN0b3JQcmVmaXgsIGNzc1RleHQsIHN0eWxlVGFnKSB7XG4gIHRoaXMuc2VsZWN0b3JQcmVmaXggPSBzZWxlY3RvclByZWZpeDtcbiAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcblxuICAvLyBEZWZhdWx0IHRvIGFuIGludGVybmFsIDxzdHlsZT4gdGFnIGlmIG9uZSB3YXNuJ3QgcGFzc2VkLlxuICB0aGlzLnN0eWxlVGFnID0gc3R5bGVUYWcgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xufTtcblxuLy8gTGV0cyB0cnkgYW5kIG1ha2UgdGhpcyBjb21wYXRpYmxlIHdpdGggYXMgbWFueSBicm93c2VycyBhcyBwb3NzaWJsZS5cblNjb3BlZENzcy5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGVTaGVldCA9IG5ldyBTdHlsZVNoZWV0KHRoaXMuc3R5bGVUYWcpO1xuICB2YXIgY3NzUnVsZXMgPSBzdHlsZVNoZWV0LmNzc1J1bGVzKCk7XG5cbiAgY3NzUnVsZXMuZm9yRWFjaChmdW5jdGlvbihydWxlKSB7XG4gICAgcnVsZS5hcHBseVByZWZpeCh0aGlzLnNlbGVjdG9yUHJlZml4KTtcbiAgfSwgdGhpcyk7XG59O1xuXG4vLyBQbGFjZSB0aGUgaW50ZXJuYWwgc3R5bGUgZWxlbWVlbnQgaW4gd2hhdGV2ZXIgaG9zdCBlbGVtZW50IGlzIHByb3ZpZGVkLlxuU2NvcGVkQ3NzLnByb3RvdHlwZS5hcHBlbmRUbyA9IGZ1bmN0aW9uKGhvc3RFbGVtZW50KSB7XG4gIC8vIFNldCB0aGUgY29udGVudHMgb2YgdGhlIHN0eWxlIHRhZyB3aGljaCB3aWxsIGJlIHBhcnNlZC5cbiAgdGhpcy5zdHlsZVRhZy5pbm5lckhUTUwgPSB0aGlzLmNzc1RleHQ7XG5cbiAgLy8gQWRkIHRoZSBzdHlsZSB0YWcgdG8gdGhlIHBhcmVudC5cbiAgaG9zdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZVRhZyk7XG5cbiAgLy8gSWYgYm90aCB0aGUgc2VsZWN0b3JQcmVmaXggYW5kIGNzc1RleHQgYXJlIHNldCwgcHJvY2VzcyB0aGUgc2NvcGUuXG4gIGlmICh0aGlzLnNlbGVjdG9yUHJlZml4ICYmIHRoaXMuY3NzVGV4dCkge1xuICAgIHRoaXMucHJvY2VzcygpO1xuICB9XG59O1xuXG4vLyBUaGlzIGlzIHRoZSBkZWZhdWx0IHNlbGVjdG9yIHRvIGxvb2sgZm9yIHdoZW4gbW9uaXRvcmluZy5cblNjb3BlZENzcy5kZWZhdWx0U2VsZWN0b3IgPSBcIjpub3QoW2RhdGEtc2NvcGVkY3NzXSkgc3R5bGVbc2NvcGVkXVwiO1xuXG4vLyBUaGlzIHdpbGwgcHJvY2VzcyBhIGdpdmVuIHJlZ2lvbiBjb250YWluaW5nIHNjb3BlZCBzdHlsZXMuXG5TY29wZWRDc3MuYXBwbHlUbyA9IGZ1bmN0aW9uKGhvc3RFbGVtZW50KSB7XG4gIC8vIERlZmF1bHQgdG8gdGhlIGJvZHkgZWxlbWVudC5cbiAgaG9zdEVsZW1lbnQgPSBob3N0RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gIC8vIFF1ZXJ5IGZvciBhbGwgdGhlIHNjb3BlZCBzdHlsZSB0YWdzIHRoYXQgaGF2ZSBub3QgYWxyZWFkeSBiZWVuXG4gIC8vIHByb2Nlc3NlZC5cbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRlZmF1bHRTZWxlY3Rvcik7XG5cbiAgLy8gQ29lcmNlIHRvIGFuIEFycmF5IGFuZCBpdGVyYXRlLlxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgLy8gQ3JlYXRlIGEgY3VzdG9tIGlkZW50aWZpZXIgZm9yIHRoaXMgZWxlbWVudCwgc2luY2Ugc2NvcGVkIGRvZXNuJ3RcbiAgICAvLyBhY3R1YWxseSBleGlzdCB5ZXQuXG4gICAgdmFyIGlkID0gKCtuZXcgRGF0ZSgpKS50b1N0cmluZygxNik7XG4gICAgZWxlbWVudC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2NvcGVkY3NzXCIsIGlkKTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBzY29wZWQgc3R5bGVzaGVldCB0aGF0IHdlIHdpbGwgcmVwbGFjZSB0aGUgZXhpc3Rpbmcgd2l0aC5cbiAgICBuZXcgU2NvcGVkQ3NzKFwiW2RhdGEtc2NvcGVkY3NzPSdcIiArIGlkICtcIiddXCIsIG51bGwsIGVsZW1lbnQpLnByb2Nlc3MoKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjb3BlZENzcztcblxufSkoKSIsInZhciBDc3NSdWxlID0gcmVxdWlyZShcIi4vY3NzUnVsZVwiKTtcblxuLy8gTG9hZCBpbiB0aGUgc3R5bGVzaGVldC5cbnZhciBTdHlsZVNoZWV0ID0gZnVuY3Rpb24oc3R5bGVUYWcpIHtcbiAgdGhpcy5zdHlsZVRhZyA9IHN0eWxlVGFnO1xufTtcblxuU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0U3R5bGVTaGVldCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHlsZVRhZy5zaGVldDtcbn07XG5cbi8vIFBsYWNlIHRoZSBpbnRlcm5hbCBzdHlsZSBlbGVtZWVudCBpbiB3aGF0ZXZlciBob3N0IGVsZW1lbnQgaXMgcHJvdmlkZWQuXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5jc3NSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcnVsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmdldFN0eWxlU2hlZXQoKS5jc3NSdWxlcyk7XG5cbiAgcmV0dXJuIHJ1bGVzLm1hcChmdW5jdGlvbihydWxlLCBpbmRleCkge1xuICAgIHJldHVybiBuZXcgQ3NzUnVsZShydWxlLCBpbmRleCk7XG4gIH0sIHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZVNoZWV0O1xuIiwiLy8gU2luZ2xlIHJ1bGUgZGVmaW5pdGlvbiBhYnN0cmFjdGlvbi5cbnZhciBDc3NSdWxlID0gZnVuY3Rpb24oY3NzUnVsZSwgaW5kZXgpIHtcbiAgdGhpcy5ydWxlID0gY3NzUnVsZTtcbiAgdGhpcy5pbmRleCA9IGluZGV4O1xufTtcblxuQ3NzUnVsZS5wcm90b3R5cGUuYXBwbHlQcmVmaXggPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgdmFyIHNlbGVjdG9yVGV4dCA9IHRoaXMucnVsZS5zZWxlY3RvclRleHQ7XG4gIHZhciBwYXJlbnRTdHlsZVNoZWV0ID0gdGhpcy5ydWxlLnBhcmVudFN0eWxlU2hlZXQ7XG4gIHZhciBjc3NUZXh0ID0gdGhpcy5ydWxlLmNzc1RleHQ7XG5cbiAgdGhpcy5ydWxlLnNlbGVjdG9yVGV4dCA9IHByZWZpeCArIFwiIFwiICsgc2VsZWN0b3JUZXh0O1xuXG4gIGlmICh0aGlzLnJ1bGUuc2VsZWN0b3JUZXh0ID09PSBzZWxlY3RvclRleHQpIHtcbiAgICBwYXJlbnRTdHlsZVNoZWV0LmRlbGV0ZVJ1bGUodGhpcy5pbmRleCk7XG4gICAgcGFyZW50U3R5bGVTaGVldC5pbnNlcnRSdWxlKHByZWZpeCArIFwiIFwiICsgY3NzVGV4dCwgdGhpcy5pbmRleCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3NzUnVsZTtcbiJdfQ==(1)
});
;