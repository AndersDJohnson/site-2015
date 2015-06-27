module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['dev']);

  grunt.registerTask('dev', [
    'assemble:dev',
    'less:dev',
    'copy:common',
    'autoprefixer:common'
  ]);

  grunt.registerTask('prod', [
    'assemble:prod',
    'less:prod',
    'copy:common',
    'autoprefixer:common'
  ]);

  grunt.registerTask('prodPreview', [
    'assemble:prodPreview',
    'less:dev',
    'copy:common',
    'autoprefixer:common'
  ]);

  var gruntConfig = {

    conf: {
      less: {
        common: {
          files: [
            {
              expand: true,
              cwd: 'src/less',
              src: [
                '**/*.less',
                '!**/_*.less'
              ],
              dest: 'public/css',
              ext: '.less.css'
            }
          ]
        }
      },
      css: {
        commonBuilt: {
          files: [
            {
              expand: true,
              cwd: 'public/css',
              src: [
                '**/*.css'
              ],
              dest: 'public/css',
              ext: '.css',
              extDot: 'last'
            }
          ]
        }
      },
      assemble: {
        common: {
          files: [
            {
              expand: true,
              cwd: 'src/pages',
              src: [
                '**/*.hbs'
              ],
              dest: 'public',
              ext: '.html'
            }
          ]
        }
      }
    },

    less: {
      options: {
        // sourceMap: true,
        // sourceMapRootpath: './apples/',
        // outputSourceFiles: true,
        dumpLineNumbers: 'all',
        ieCompat: true
      },
      dev: {
        options: {
          modifyVars: {
            imageRoot: '"<%= assemble.dev.options.imageRoot %>"'
          }
        },
        files: '<%= conf.less.common.files %>'
      },
      prod: {
        options: {
          modifyVars: {
            imageRoot: '"<%= assemble.prod.options.imageRoot %>"'
          }
        },
        files: '<%= conf.less.common.files %>'
      }
    },

    autoprefixer: {
      options: {
        
      },
      common: {
        files: '<%= conf.css.commonBuilt.files %>'
      },
    },

    assemble: {
      options: {
        helpers: [ 'src/helpers/**/*.js' ],
        partials: [
          'src/partials/**/*.hbs',
          'src/layouts/**/*.hbs'
        ],
        data: [ 'src/data/**/*.{json,yml}' ],
        layout: 'layout-masthead-slim.hbs',
        layoutdir: 'src/layouts'
      },
      dev: {
        options: {
          root: '/',
          imageRoot: '/img/',
          config: {
            env: 'dev'
          }
        },
        files: '<%= conf.assemble.common.files %>'
      },
      prodPreview: {
        options: {
          root: '/',
          imageRoot: '/img/',
          config: {
            env: 'prod'
          }
        },
        files: '<%= conf.assemble.common.files %>'
      },
      prod: {
        options: {
          root: '/site-2015/',
          imageRoot: '/site-2015/img',
          config: {
            env: 'prod'
          }
        },
        files: '<%= conf.assemble.common.files %>'
      }
    },

    copy: {
      common: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'img/**/*',
              'js/**/*'
            ],
            dest: 'public'
          }
        ],
        tasks: ['dev']
      }
    },

    watch: {
      options: {
        livereload: true,
        atBegin: true
      },
      dev: {
        files: [
          'Gruntfile.js',
          'src/**/*',
          'public/bower_components/**/*.{css,less,js}',
        ],
        tasks: ['dev']
      }
    },

    connect: {
      dev: {
        options: {
          port: 2112,
          base: 'public',
          keepalive: true
        }
      }
    }

  };


  grunt.initConfig(gruntConfig);

};
