QUnit.config.autostart = false;

require({
  paths: {
    "lib": "../lib"
  }
}, [
  "spec/index.spec",
  "spec/cssRule.spec"
], QUnit.start);
