module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			configFiles: {
			files: [ 'Gruntfile.js', 'config/*.js' ],
			options: {
				reload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: '.'
				}
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.registerTask('default', ['connect','watch']);
};
