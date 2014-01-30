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
});
