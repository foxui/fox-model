/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      distPath: 'dist/',
      srcPath: 'src/'
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Foxui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/foxui/<%= pkg.name %>/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @fex-team.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: ['<%= meta.distPath %>']
    },

    copy: {
      src: {
        expand: true,
        cwd: 'src/',
        src: '*.html',
        dest: '<%= meta.distPath %>'
      }
    },

    watch: {
      scripts: {
        files: [
          'src/**/*'
        ],
        tasks: ['dist']
      }
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Default task(s).
  grunt.registerTask('dist', ['clean', 'copy:src']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);

};
