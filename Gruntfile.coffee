module.exports = ->
  @initConfig

    clean: ["dist", "test/reports"]

    jshint: ["src/**/*.js"]

    requirejs:
      default:
        options:
          mainConfigFile: "build/config.js"
          optimize: "none"
          out: "scopedcss.js"
          name: "index"

          onBuildWrite: (id, path, contents) ->
            defineExp = /define\(.*?\{/
            returnExp = /return.*[^return]*$/
            
            # Remove AMD wrapper ceremony for standalone use.
            contents = contents.replace(defineExp, "").replace(returnExp, "")

          wrap:
            startFile: "build/start.js"
            endFile: "build/end.js"

    qunit:
      options:
        "--web-security": "no"

        coverage:
          src: ["src/**/*.js"]
          instrumentedFiles: "test/tmp"
          htmlReport: "test/report/coverage"
          coberturaReport: "test/report"
          lcovReport: "test/report"
          linesThresholdPct: 85

      files: ["test/index.html"]

  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-requirejs"
  #@loadNpmTasks "grunt-qunit-istanbul"

  @registerTask "default", [
    "clean"
    "jshint"
    "requirejs"
    #"qunit"
  ]
