var ScopedCss = require("../../");

new ScopedCss("my-element", "h1, h2 { color: green; } h2 + b { color: red; }").process();
