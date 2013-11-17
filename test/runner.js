QUnit.config.autostart = false;

require({
  paths: {
    "src": "../src"
  }
}, [
  "spec/index.spec"
], QUnit.start);
