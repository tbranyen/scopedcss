module.exports = ->
  @initConfig
    clean: ["dist", "test/reports"]
    jshint: ["src/**/*.js"]

    requirejs:
      default:
        options:
          mainConfigFile: "build/config.js"
          optimize: "none"
          out: "dist/scopedcss.js"
          name: "index"

          onBuildWrite: (id, path, contents) ->
            defineExp = /define\(.*?\{/
            returnExp = /return.*[^return]*$/
            
            # Remove AMD ceremony for use without require.js or almond.js.
            contents = contents.replace(defineExp, "").replace(returnExp, "")

          wrap:
            startFile: "build/start.js"
            endFile: "build/end.js"

    uglify:
      options:
        sourceMap: "dist/scopedcss.js.map"
        sourceMapRoot: ""
        sourceMapPrefix: 1
        preserveComments: "some"
        report: "gzip"

      default:
        files:
          "dist/scopedcss.min.js": ["dist/scopedcss.js"]

  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-requirejs"
  @loadNpmTasks "grunt-contrib-uglify"

  @registerTask "default", ["clean", "jshint", "requirejs", "uglify"]
