module.exports = function(grunt) {

  let iconslist = {}
  // List all files in the templates directory.
  let iconsfile = grunt.file.expand({filter: "isFile", cwd: "raw_icons/Iconly"},
  ["*"]);
   iconsfile.forEach(function (t) {
    iconslist[t.replace(".svg","")] =  grunt.file.read("raw_icons/Iconly/" + t)
});
  grunt.initConfig({
    json_generator: {
      svgstore: {
        dest: "iconset.json", // Destination file
        options: {
          icons: iconslist
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-json-generator');
  grunt.registerTask('default', ['json_generator']);

};
