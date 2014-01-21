module.exports = ->
  @initConfig

    clean: ["dist", "test/report"]

    jshint:
      files: ["src/**/*.js"]
      test:
        files:
          src: "test/spec/*.js"

    requirejs:
      default:
        options:
          baseUrl: "src"
          optimize: "none"
          out: "scopedcss.js"
          name: "index"
          useStrict: true

          onBuildWrite: (id, path, contents) ->
            defineExp = /define\(.*?\{/
            returnExp = /return.*[^r][^e][^t][^u][^r][^n]*$/

            # Remove AMD wrapper ceremony for standalone use.
            contents = contents.replace(defineExp, "").replace(returnExp, "")

          wrap:
            startFile: "build/start.js"
            endFile: "build/end.js"

    qunit:
      options:
        "--web-security": "no"

        coverage:
          src: ["src/*.js"]
          instrumentedFiles: "test/tmp"
          lcovReport: "test/report"
          linesThresholdPct: 85

      files: ["test/index.html"]

  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-requirejs"
  @loadNpmTasks "grunt-qunit-istanbul"

  @registerTask "default", ["clean", "jshint", "requirejs", "qunit"]
