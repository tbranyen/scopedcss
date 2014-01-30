define(function(require) {
  "use strict";

  var CssRule = require("lib/cssRule");

  QUnit.module("cssRule", {
    setup: function() {},
    teardown: function() {}
  });

  test("initialization", 1, function() {
    var cssRule = new CssRule();
    ok(cssRule instanceof CssRule, "Default constructor.");
  });

  test("formatting valid pseudo selector content", 1, function() {
    var cssRule = new CssRule();
    var prefixed = cssRule.formatCssText("h2", "h1:after { content: ' {'; }");

    equal(prefixed, "h2 h1:after { content: ' {'; }", "can parse selector");
  });

  test("formatting valid attribute selectors", 1, function() {
    var cssRule = new CssRule();
    var prefixed = cssRule.formatCssText("h2", "h1[data-a=' }  {'] {}");

    equal(prefixed, "h2 h1[data-a=' }  {'] {}", "can parse selector");
  });

  test("apply a prefix", 1, function() {
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.cssText = "h1 { color: black; }";
    style.innerHTML = "h1 { color: black; }";

    // Add the style into the root so the browser will parse it.
    document.documentElement.appendChild(style);

    var rule = style.sheet.cssRules[0];
    var cssRule = new CssRule(rule, 0);

    cssRule.applyPrefix("h2");

    var prefixed = cssRule.rule.cssText;

    equal(prefixed, "h2 h1 { color: black; }", "can parse selector");

    // Clean up the element after testing.
    style.parentNode.removeChild(style);
  });

  test("alternative code path for browsers that are wrong", 1, function() {
    var rule = {
      parentStyleSheet: {
        deleteRule: function(index) {
          rule.rules.splice(index, 1);
        },

        insertRule: function(cssText, index) {
          rule.rules[index] = cssText;
        }
      },

      rules: ["h1 { color: black; }"]
    };
    var cssRule = new CssRule(rule, 0);

    // Simulate incorrect browser behavior.
    Object.defineProperty(rule, "selectorText", {
      get: function() {
        var selectorText = rule.rules[0];

        // Coerce to single quotes.
        selectorText = selectorText.replace(/\"/g, "'");

        return selectorText;
      },

      set: function() {}
    });

    Object.defineProperty(rule, "cssText", {
      get: function() {
        var selectorText = rule.rules[0];

        // Coerce to single quotes.
        selectorText = selectorText.replace(/\"/g, "'");

        return selectorText;
      },

      set: function() {}
    });

    cssRule.applyPrefix("h2");

    var prefixed = cssRule.rule.selectorText;

    equal(prefixed, "h2 h1 { color: black; }", "can parse selector");
  });
});
