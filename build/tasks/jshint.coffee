module.exports = ->

  @config "jshint",
    files: ["lib/**/*.js"]

    test:
      files:
        src: "test/spec/*.js"

  @loadNpmTasks "grunt-contrib-jshint"
