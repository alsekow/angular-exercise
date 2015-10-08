/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    less: {
      development: {
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jasmine:dev'],
        options: {
          livereload: false
        }
      },
      less: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/*.css'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          open: 'http://localhost:8000/index.html',
          livereload: true
        }
      }
    },
    serve: {
      options: {
        port: 9000,
        aliases: {
          '/index.html': {
            tasks: ['watch', 'open'],
            output: 'index.html'
          }
        }
      }
    },
    jasmine: {
      dev: {
        src: ['js/*.js'],
        options: {
          specs: 'tests/spec/*Spec.js',
          helpers: 'tests/*Helper.js',
          vendor: ['bower_components/angular/angular.js', 'bower_components/angular-mocks/angular-mocks.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('serve', ['jasmine', 'connect', 'watch']);
  //grunt.registerTask('serve', ['connect', 'watch']);

};
