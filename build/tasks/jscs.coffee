module.exports = ->

  @config "jscs",
    options:
      config: ".jscs.json"

    src: [
      "lib/**/*.js"
      "test/**/*js"
      "!test/tmp/**"
    ]

  @loadNpmTasks "grunt-jscs-checker"
