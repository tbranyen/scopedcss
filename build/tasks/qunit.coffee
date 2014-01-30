module.exports = ->

  @config "qunit",
    options:
      "--web-security": "no"

      coverage:
        src: ["lib/*.js"]
        instrumentedFiles: "test/tmp"
        lcovReport: "test/report"
        linesThresholdPct: 85

    files: ["test/index.html"]

  @loadNpmTasks "grunt-qunit-istanbul"
