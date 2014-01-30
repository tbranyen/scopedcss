module.exports = ->

  @config "jscs",
    options:
      config: ".jscs.json"

    src: "lib/"

  @loadNpmTasks "grunt-jscs-checker"
