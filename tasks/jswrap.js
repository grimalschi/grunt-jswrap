'use strict';

module.exports = function (grunt) {
    var jswrap;
    grunt.registerMultiTask('jswrap', 'Wrap all function to the try-catch statement with custom body', function () {
        jswrap = jswrap || require('jswrap');

        this.files.forEach(function (file) {
            var contents = file.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                return grunt.file.read(filepath);
            }).join('');

            var result = jswrap(contents, file.catchbody);

            grunt.file.write(file.dest, result);
        });
    });
};