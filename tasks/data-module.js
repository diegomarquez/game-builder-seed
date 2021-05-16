var path = require('path');
var beautify = require('js-beautify')
	.js_beautify;

module.exports = function(grunt) {
	grunt.registerMultiTask('create-data-modules', function() {
		var template = this.options()
			.template;

		for (var i = 0; i < this.files.length; i++) {
			var file = this.files[i];

			var glob = file.src;
			var dest = file.dest;
			var writeMode = file.writeMode;
			var removeWhiteSpace = file.removeWhiteSpace;

			for (var j = 0; j < glob.length; j++) {
				var src = glob[j];

				var data;

				if (writeMode == 'string') {
					data = "'" + grunt.file.read(src) + "'";
				} else {
					data = grunt.file.read(src);
				}

				if (removeWhiteSpace) {
					data = data.replace(/\s/g, '');
				}

				var extension = path.extname(src);
				var baseName = path.basename(src, extension);

				// Process the template
				var r = grunt.template.process(grunt.file.read('tasks/templates/' + template), {
					data: {
						name: baseName,
						data: data
					}
				});

				// Destination path
				var name = dest + this.target + '.js';

				// Delete the file if it already exists
				if (grunt.file.isFile(name)) {
					grunt.file.delete(name, {
						force: true
					});
				}

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

				grunt.file.write(name, r);
			}
		};
	});
}
