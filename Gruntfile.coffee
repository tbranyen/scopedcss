module.exports = ->
  @loadTasks "build/tasks"

  @registerTask "default", [
    "clean"
    "jscs"
    "jshint"
    "synchronizer"
    "qunit"
  ]
