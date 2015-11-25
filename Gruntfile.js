module.exports = function (grunt) {

  // Grunt tasks
  // ==========================================================================

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-compress');


  // Configure Grunt tasks
  // ==========================================================================

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/style/style.css': 'public/sass/style.scss'
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          atBegin: true
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
  });


  // Task definitions
  // ==========================================================================

  // Compiles Sass files
  grunt.registerTask('css', ['sass']);

  // Compile Sass once and start the server
  grunt.registerTask('server', ['sass', 'nodemon']);


  // Start the server and watches for Sass file changes
  grunt.registerTask('dev', ['concurrent']);
};
