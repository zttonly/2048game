'use strict' ;

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,

		copy: {
			dist_html: {
				src: '<%= config.dist %>/<%= pkg.name %>.min.js',
				dest: '<%= config.app %>/js/<%= pkg.name %>.min.js'

				// files: [
				// 	{
				// 		src: '<%= config.app %>/index.html',
				// 		dest: '<%= config.dist %>/index.html'
				// 	},
				// 	{
				// 		src: '<%= config.app %>/js/main2048.js',
				// 		dest: '<%= config.dist %>/js/main2048.js'
				// 	}
				// ]

				// files: {
				// 	'<%= config.dist %>/index.html': '<%= config.app %>/index.html',
				// 	'<%= config.dist %>/js/main2048.js': ['<%= config.app %>/js/main2048.js']
				// }
				// files: [
				// 	{
				// 		expand: true,
				// 		cwd: '<%= config.app %>/',
				// 		src: '**/*.js',
				// 		dest: '<%= config.dist %>/',
				// 		ext: '.js',
				// 		extDot:'last',
				// 		flatten: true,
				// 		rename: function(dest,src){
				// 			return dest + 'js/' + src;
				// 		}
				// 	}
				// ]
			}
		},

		clean: {
			dist: {
				// src: ['<%= config.dist%>/index.html', '<%= config.dist %>/js/main2048.js']
				src: ['<%= config.dist %>/**/*'],
				//filter: 'isFile'
			}
		},

		concat: {
			options: {
				separator:';'
			},
			dist :{
				src: '<%= config.app %>/js/!(*.min.js)',
				dest: '<%= config.dist %>/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm--yyyy") %>*/\n'
			},
			dist:{
				files:{
					'<%= config.dist %>/<%= pkg.name %>.min.js':['<%= concat.dist.dest %>']
				}
			}
		},

		qunit: {
			files:['test/**/*.html']
		},

		jshint: {
			files:['Gruntfile.js','<%= config.app %>/**/*.js'],
			options: {
				global:{
					jQuery:true,
					cosole:true,
					module:true,
					document:true
				}
			}
		},
		watch:{
			files:['<%= jshint.files %>'],
			tasks:['jshint','qunit']
		}
	});
	
	grunt.registerTask('test',['jshint','qunit']);

	grunt.registerTask('default',['jshint','qunit','concat','uglify']);
}