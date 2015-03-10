'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    demo: 'demo',
    dist: 'dist',
    assets: 'assets'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
          '<%= config.src %>/{,*/}*.js',
          '<%= config.demo %>/{,*/}*.js',
          '<%= config.src %>/{,*/}*.spec.js',
          '<%= config.demo %>/{,*/}*.mock.js',
          '<%= config.demo %>/{,*/}*.data.js'
        ],
        tasks: ['newer:jshint:all','injector'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['<%= config.src %>/{,*/}*.spec.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      less: {
        files: [
          '<%= config.demo %>/**/*.less',
          '<%= config.src %>/**/*.less',
          '<%= config.demo %>/app.less',
          '<%= config.src %>/angular-cms-blox.less'
        ],
        tasks: ['less', 'autoprefixer']
      },
      html: {
        files: [
          '<%= config.src %>/{,*/}*.html'
        ],
        tasks: ['ngtemplates']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.demo %>/{,*/}*.html',
          '<%= config.src %>/{,*/}*.html',
          '<%= config.demo %>/{,*/}*.less',
          '<%= config.src %>/{,*/}*.less',
          '.tmp/styles/{,*/}*.css',
          '<%= config.assets %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    ngtemplates: {
      'angularCmsBlox': {
        src:      '<%= config.src %>/**/*.template.html',
        dest:     '.tmp/src/angular-cms-blox-templates.js',
        options:  {
          url:    function(url) { return url.replace('src/', ''); }
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 36729
      },
      livereload: {
        options: {
          open: false,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('assets'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/fonts',
                connect.static('./bower_components/font-awesome/fonts')
              ),
              connect().use(
                '/fonts',
                connect.static('./bower_components/bootstrap/fonts')
              ),
              connect().use(
                '/',
                connect.static('./src')
              ),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              connect.static(appConfig.demo)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('assets'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/fonts',
                connect.static('./bower_components/font-awesome/fonts')
              ),
              connect().use(
                '/fonts',
                connect.static('./bower_components/bootstrap/fonts')
              ),
              connect().use(
                '/',
                connect.static('./src')
              ),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              connect.static(appConfig.demo)
            ];
          }
        }
      },
      dist: {
        options: {
          open: false,
          base: '<%= config.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/{,*/}*.js',
          '!<%= config.src %>/{,*/}*.spec.js',
          '!<%= config.src %>/{,*/}*.mock.js',
          '!<%= config.src %>/{,*/}*.data.js'
        ]
      },
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/{,*/}*',
            '!<%= config.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.less',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= config.demo %>/index.html'],
        ignorePath:  /\.\./
      }
    },

    injector: {
      options: {
//        'ignorePath': '<%= config.src %>'
      },
      'local_dependencies': {
        files: {
          '<%= config.demo %>/index.html':
            [
              '<%= config.src %>/angular-cms-blox.mock.data.js',
              '<%= config.src %>/angular-cms-blox.mock.js',
              '<%= config.src %>/angular-cms-blox.js',
              '<%= config.src %>/**/*.js',
              '!<%= config.src %>/**/*.spec.js'
            ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= config.dist %>','<%= config.dist %>/images']
      }
    },

    cssmin: {
       dist: {
         files: {
           '<%= config.dist %>/styles/angular-cms-blox.min.css': [
             '.tmp/styles/angular-cms-blox.css'
           ]
         }
       }
    },
    uglify: {
       dist: {
         files: {
           '<%= config.dist %>/angular-cms-blox.min.js': [
             '.tmp/js/angular-cms-blox.js'
           ]
         }
       }
    },
    concat: {
       dist: {
         files: {
           '.tmp/js/angular-cms-blox.js': [
             '<%= config.src %>/angular-cms-blox.js',
             '.tmp/**/*.js',
             '<%= config.src %>/**/*.js',
             '!<%= config.src %>/**/*.mock.js',
             '!<%= config.src %>/**/*.spec.js'
           ]
         }
       }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/js'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= config.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '{,*/}*.html',
            '{,*/}*.{webp}'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= config.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.tmp/styles',
          dest: '<%= config.dist %>/styles',
          src: ['angular-cms-blox.css']
        }, {
          expand: true,
          cwd: '.tmp/js',
          dest: '<%= config.dist %>',
          src: ['angular-cms-blox.js']
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'less',
        'ngtemplates'
      ],
      test: [
        'less',
        'ngtemplates'
      ],
      dist: [
        'less',
        'ngtemplates',
        'imagemin',
        'svgmin'
      ]
    },

    // Compiles Less to CSS
    less: {
      options: {
        paths: [
          '<%= config.src %>/'
        ]
      },
      server: {
        files: {
          '.tmp/styles/app.css' : '<%= config.demo %>/app.less',
          '.tmp/styles/angular-cms-blox.css' : '<%= config.src %>/angular-cms-blox.less'
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    ngdocs: {
      options:{
        dest: 'docs',
        html5Mode: true
      },
      all: [
        'src/*.js',
        'src/**/*.js',
        '!src/**/*.spec.js',
        '!src/**/*.mock.js'
      ]
    }

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'injector',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'injector',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
