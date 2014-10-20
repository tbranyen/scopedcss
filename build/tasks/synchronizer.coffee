module.exports = ->
  @loadNpmTasks "grunt-synchronizer"

  @config "synchronizer",
    options:
      name: "ScopedCSS"

    build:
      files:
        "dist/scopedcss.js": "lib/index.js"
