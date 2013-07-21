# Grunt configuration updated to latest Grunt.  That means your minimum
# version necessary to run these tasks is Grunt 0.4.
#
# Please install this locally and install `grunt-cli` globally to run.
module.exports = ->

  # Initialize the configuration.
  @initConfig

    # Ensure the dist/ directory stays fresh.
    clean: 
      default: ["dist", "test/reports"]

    # Lint source, node, and test code with some sane options.
    jshint:
      default: ["src/**/*.js"]

      # Allow ES5 so that `delete` may be used as an identifer.
      options:
        eqnull: true
        boss: true
        proto: true

    # Build out the library.
    requirejs:
      # The default build.
      default:
        options:
          mainConfigFile: "build/config.js"
          optimize: "none"
          out: "dist/scopedcss.js"
          name: "../build/almond"

          wrap:
            startFile: "build/start.js"
            endFile: "build/end.js"

    # Provide an optimized version of the library as well.
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

    karma:
      options:
        basePath: process.cwd()
        singleRun: true

        frameworks: ["mocha"]
        reporters: ["progress", "coverage"]

        plugins: [
          "karma-coverage",
          "karma-mocha",
          "karma-chrome-launcher",
          "karma-firefox-launcher",
          "karma-safari-launcher",
          "karma-phantomjs-launcher"
        ]

        files: [
          { pattern: "test/tests/**/*.js", included: false },
          { pattern: "src/**/*.js", included: false },
          { pattern: "vendor/**/*.js", included: false },
          { pattern: "build/**/*.js", included: false },

          "test/vendor/chai.js",
          "test/vendor/require.js",
          "test/test-runner.js"
        ]

        preprocessors:
          "src/**/*.js": "coverage"

        coverageReporter:
          type: "html"
          dir: "test/reports/coverage/"

      default:
        options:
          browsers: ["PhantomJS"]

      browsers:
        options:
          browsers: ["Chrome", "Firefox", "Safari"]

  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-requirejs"
  @loadNpmTasks "grunt-contrib-uglify"

  # Default task.
  @registerTask "default", ["clean", "jshint", "requirejs", "uglify"]
