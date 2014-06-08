module.exports = ->
  @loadNpmTasks "grunt-browserify"

  @config "browserify",
    options:
      transform: ["deamdify"]

      bundleOptions:
        standalone: "ScopedCSS"

    modern:
      files:
        "dist/scopedcss.js": ["lib/index.js"]
