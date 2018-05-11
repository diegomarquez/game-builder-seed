var beautify = require('js-beautify').js_beautify;

module.exports = function(grunt) {
	grunt.registerTask('beautify', function() {
		var p = grunt.file.readJSON('package.json');
		var options = this.options();

		var paths = [];

		paths.push(p.additionalSrcPaths);
		paths.push(p.framework);
		paths.push('src');
		paths.push('tasks');


		var files = [];
		var glob = '/**/*.js';

		for(var i = 0; i < paths.length; i++) {
			if(paths[i] != "") {
				files = files.concat(grunt.file.expand(paths[i] + glob));
			}
		}

		files.push("main.js");
		files.push("Gruntfile.js");

		for(var i = 0; i < files.length; i++) {
			if(files[i] != "") {
				var n = files[i];

				console.log(n);

				var r = grunt.file.read(n);

				r = beautify(r, {
					indent_with_tabs: true,
					end_with_newline: true,
					indent_level: 0,
					preserve_newlines: true,
					max_preserve_newlines: 10,
					break_chained_methods: true,
					keep_array_indentation: true,
					brace_style: "collapse"
				});

				if (grunt.file.isFile(n)) {
					grunt.file.delete(n, { force: true });
				}
				
				grunt.file.write(n, r);
			}
		}
	});
};

