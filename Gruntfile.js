module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['dev']);

  grunt.registerTask('dev', [
    'assemble:dev',
    'less:common',
    'copy:common'
  ]);

  grunt.registerTask('prod', [
    'assemble:prod',
    'less:common',
    'copy:common'
  ]);

  grunt.registerTask('prodPreview', [
    'assemble:prodPreview',
    'less:common',
    'copy:common'
  ]);

  var gruntConfig = {

    conf: {
      less: {
        common: {
          files: [
            {
              expand: true,
              cwd: 'src/less',
              src: '**/*.less',
              dest: 'public/css',
              ext: '.less.css'
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
                '**/*.hbs.html'
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
      common: {
        options: {},
        files: '<%= conf.less.common.files %>'
      }
    },

    assemble: {
      options: {
        helpers: [ 'src/helpers/**/*.js' ],
        partials: [
          'src/partials/**/*.hbs.html',
          'src/layouts/**/*.hbs.html'
        ],
        data: [ 'src/data/**/*.{json,yml}' ],
        layout: 'layout-default.hbs.html',
        layoutdir: 'src/layouts'
      },
      dev: {
        options: {
          root: '/',
          config: {
            env: 'dev'
          }
        },
        files: '<%= conf.assemble.common.files %>'
      },
      prodPreview: {
        options: {
          root: '/',
          config: {
            env: 'prod'
          }
        },
        files: '<%= conf.assemble.common.files %>'
      },
      prod: {
        options: {
          root: '/site-2015/',
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
              'images/**/*',
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
