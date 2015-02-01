module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['dev']);

  grunt.registerTask('dev', [
    'assemble:dev',
    'less:dev',
    'copy:dev'
  ]);

  grunt.initConfig({

    less: {
      dev: {
        options: {
          // sourceMap: true,
          // sourceMapRootpath: './apples/',
          // outputSourceFiles: true,
          dumpLineNumbers: 'all',
          ieCompat: true
        },
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
      dev: {
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
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: [
            '**/*.hbs.html'
          ],
          dest: 'public',
          ext: '.html'
        }]
      }
    },

    copy: {
      dev: {
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
        livereload: true
      },
      dev: {
        files: [
          'Gruntfile.js',
          'src/**/*'
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

  });

};
