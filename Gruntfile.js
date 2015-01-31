module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', 'less');

  grunt.initConfig({

    less: {
      dev: {
        options: {
          sourceMap: true,
          dumpLineNumbers: 'all',
          ieCompat: true
        },
        files: [
          {
            expand: true,
            cwd: 'less',
            src: '**/*.less',
            dest: 'css',
            ext: '.less.css'
          }
        ]
      }
    },

    watch: {
      dev: {
        files: 'less/**/*.less',
        tasks: 'less:dev'
      }
    }

  });

};
