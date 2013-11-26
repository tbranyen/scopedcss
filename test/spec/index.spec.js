define(function(require) {
  "use strict";

  var ScopedCss = require("src/index");

  QUnit.module("index", {
    setup: function() {},
    teardown: function() {}
  });

  test("initialization", 1, function() {
    var scopedCss = new ScopedCss();
    ok(scopedCss instanceof ScopedCss, "Default constructor.");
  });

  test("optional arguments", 3, function() {
    var scopedCss = new ScopedCss(".prefix");

    equal(scopedCss.prefix, ".prefix", "Has correct prefix.");
    equal(scopedCss.cssText, undefined, "Has no cssText.");
    ok(scopedCss.styleTag instanceof HTMLStyleElement, "Is a valid style tag.");
  });

  test("default selector", 1, function() {
    ok(typeof ScopedCss.defaultSelector === "string", "Is a valid string.");
  });

  test("replace @host", 1, function() {
    var scopedCss = new ScopedCss(".prefix");
    var cssText = scopedCss.prepare("@host { color: red; }");

    equal(cssText, ".prefix { color: red; }", "Is properly prefixed.");
  });

  test("process prefixing", 2, function() {
    var scopedCss = new ScopedCss(".prefix", "@host { color: red; }");

    scopedCss.process();
    equal(scopedCss.styleTag.innerHTML, ".prefix { color: red; }", "Default prefix.");

    scopedCss.process(".different");
    equal(scopedCss.styleTag.innerHTML, ".different { color: red; }", "Prefix override.");
  });

  test("apply to a given region", 2, function() {
    var fixture = document.getElementById("qunit-fixture");

    ScopedCss.applyTo(fixture);

    var h1 = document.createElement("h1");
    document.body.appendChild(h1);

    notEqual(h1.style.color, "red", "Did not get prefixed styles.");

    fixture.appendChild(h1);

    equal(window.getComputedStyle(h1).color, "rgb(255, 0, 0)", "Got prefixed styles.");
  });
});
