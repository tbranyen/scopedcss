module.exports = ->

  @config "jscs",
    options:
      config: ".jscs.json"

    src: "lib/**/*.js"

  @loadNpmTasks "grunt-jscs-checker"
