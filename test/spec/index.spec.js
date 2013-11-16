(function(window) {
  "use strict";

  QUnit.module("configure", {
    setup: function() {},
    teardown: function() {}
  });

  // Ensure the correct defaults are set for all Layout and View options.
  test("defaults", 19, function() {
    // Create a new Layout to test.
    var layout = new this.Layout();
    // Create a new Layout to test.
    var view = new this.View();

    // Paths should be an empty object.
    deepEqual(layout.prefix, "", "Layout: No prefix");
    // The deferred property should be a function.
    ok(_.isFunction(layout.deferred), "Layout: deferred is a function");
    // The fetchTemplate property should be a function.
    ok(_.isFunction(layout.fetchTemplate), "Layout: fetchTemplate is a function");
    // The renderTemplate property should be a function.
    ok(_.isFunction(layout.renderTemplate), "Layout: renderTemplate is a function");
    // The partial property should be a function.
    ok(_.isFunction(layout.partial), "Layout: partial is a function");
    // The html property should be a function.
    ok(_.isFunction(layout.html), "Layout: html is a function");
    // The insert property should be a function.
    ok(_.isFunction(layout.insert), "Layout: insert is a function");
    // The append property should be a function.
    ok(_.isFunction(layout.insert), "Layout: append is a function");
    // The when property should be a function.
    ok(_.isFunction(layout.when), "Layout: when is a function");
    // Paths should be an empty object.
    deepEqual(view.prefix, "", "View: No prefix");
    // The deferred property should be a function.
    ok(_.isFunction(view.deferred), "View: deferred is a function");
