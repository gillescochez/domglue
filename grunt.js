module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      banner: '/*! github.com/gillescochez/domglue */'
    },
    concat: {
      full: {
        src: [
            '<banner>',
            'src/build/head.js',
            'src/core.js',
            'src/methods.js',
            'src/query.js',
            'src/settings.js',
            'src/helper.js',
            'src/build/foot.js'
        ],
        dest: 'dist/domglue.js'
      },
      light: {
        src: [
            '<banner>',
            'src/build/head.js',
            'src/coreLight.js',
            'src/methods.js',
            'src/settings.js',
            'src/helper.js',
            'src/build/foot.js'
        ],
        dest: 'dist/domeglue.light.js'
      }
    },
    min: {
      full: {
        src: ['<banner>', 'dist/domglue.js'],
        dest: 'dist/domglue.min.js'
      },
      light: {
        src: ['<banner>', 'dist/domglue.light.js'],
        dest: 'dist/domglue.light.min.js'
      }
    }
  });

  grunt.registerTask('default', 'concat min');
};
