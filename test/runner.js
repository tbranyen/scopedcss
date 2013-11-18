QUnit.config.autostart = false;

require({
  paths: {
    "src": "../src"
  }
}, [
  "spec/index.spec",
  "spec/cssRule.spec"
], QUnit.start);
