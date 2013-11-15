module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'public/javascripts/src/<%= pkg.name %>.js',
				dest: 'public/javascripts/build/<%= pkg.name %>.min.js'
			}
		},
		concat:{
			options: {
			//定义一个字符串插入没个文件之间用于连接输出
				separator: ';'
			},
			dist: {
				src: ['public/javascripts/src/*.js'],
				dest: 'public/javascripts/build/<%= pkg.name %>.cat.js'
			}
		},
		qunit: {
			files: ['test/*.html']
		},
		jshint: {
			files: ['gruntfile.js', 'public/javascripts/src/*.js', 'public/javascripts/build/*.js'],
			options: {
				globals: {
					exports: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Default task(s).
	grunt.registerTask('default', ['uglify','concat']);
	
};