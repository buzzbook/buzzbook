module.exports = function(grunt) {

  grunt.initConfig({
    svgstore: {
      options: {
        prefix : 'icon-',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        formatting : {
          indent_size : 2
        },
        symbol : {},
        includedemo: true,
        cleanup: true,
        cleanupdefs: true,
      },
      default : {
        files: {
          'iconset.svg': ['raw_icons/*.svg'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-svgstore');
  grunt.registerTask('default', ['svgstore']);

};
