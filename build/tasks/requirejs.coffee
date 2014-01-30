module.exports = ->

  @config "requirejs",
    default:
      options:
        baseUrl: "lib"
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

  @loadNpmTasks "grunt-contrib-requirejs"
