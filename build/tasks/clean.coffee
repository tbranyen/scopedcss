module.exports = ->

  @config "clean", [
    "dist"
    "test/report"
  ]

  @loadNpmTasks "grunt-contrib-clean"
