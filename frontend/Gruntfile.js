module.exports = function (grunt) {

	// grunt tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-svgstore');
	// grunt.loadNpmTasks('grunt-ngdocs');
	// grunt.loadNpmTasks('grunt-html-build');
 //    grunt.loadNpmTasks('grunt-protractor-runner');
 //    grunt.loadNpmTasks('grunt-karma');
 //    grunt.loadNpmTasks('grunt-svg-sprite');
 	grunt.initConfig({
	 	sass:{
			dist:{
				options:{
	                sourcemap: 'none',
				},
				files:{
					'app/css/core.css' : 'scss/core.scss',
					'app/css/lands.css': 'scss/lands.scss',
					'app/css/colors.css': 'scss/colors.scss',
					'app/css/information.css': 'scss/information.scss',
					'app/css/results.css': 'scss/results.scss',
					'app/css/errors.css': 'scss/errors.scss',


				}
			}
		},
		watch: {
		    css: {
		    	files: ['scss/*.scss'],
		    	tasks: ['sass'],
		    	options: {
		      		 livereload: true
		    	}
		  	}//,
		
		},
		svgstore: {
			options: {
				// includedemo: true,
				// symbol: {
				// 	viewbox: '0 0 100 100',
				// },
			},
			
			dist:{
				files: {
					'app/images/symbols.svg':[
						'app/images/symbols/*.svg',
					],
					'app/images/actions.svg': [
						'app/images/actions/*.svg',
					]
				},
				
			},
		}
	});
}
