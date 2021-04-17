module.exports = function(grunt) {

  grunt.initConfig({
    json_generator: {
      svgstore: {
        dest: "", // Destination file
        options: {
          icons: []
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-json-generator');
  grunt.registerTask('default', ['svgstore']);

};
