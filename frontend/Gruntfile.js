module.exports = function (grunt) {

	var JS_FILES_PATTERN = 'app/**/*.js';
	var HTML_FILES = '**/*.html';
	var DIST_PATH = 'dist/';
	var JS_FILES = [
		'app/app.module.js',
        'app/app.core.js',
        'app/app.config.js',
        'app/app.state.js',
        'app/**/*.module.js',
        JS_FILES_PATTERN,
	];
	var JS_VENDORS_FILES = [
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js'
	];
	var CSS_VENDORS_FILES = [
		'bower_components/normalize-css/normalize.css'
	];
	// grunt tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-svgstore');

 	grunt.initConfig({
	 	sass:{
			dist:{
				options:{
	                sourcemap: 'file',
				},
				files: {
					'dist/css/app.css': 'scss/app.scss',
				}
			}
		},
		watch: {
		    css: {
		    	files: ['**/*.scss'],
		    	tasks: ['sass'],
		    	options: {
		      		 livereload: true
		    	},
			},
			js: {
				files:[JS_FILES_PATTERN],
				tasks: ['concat:jsSrc'],
		  	},
			html: {
                files: ['app/**/**.html'],
                tasks: ['ngtemplates', 'htmlbuild:dev'],
            },
		},
		concat: {
			options: {
                sourceMap: true,
            },
			jsSrc: {
                options: {
                    separator: ';\n'
                },
                src: [JS_FILES],
                dest: DIST_PATH + 'js/app.js',
                nonull: true
            },
			jsVendor: {
				cwd: 'app',
				src: [JS_VENDORS_FILES],
                dest: DIST_PATH + 'js/vendor.js',
                nonull: true
			},
			cssVendor: {
				src: [CSS_VENDORS_FILES],
                dest: DIST_PATH + 'css/vendor.css',
                nonull: true
			}
		},
		jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            dist: {
                files: {
                    src: [JS_FILES_PATTERN],
                }
            }
        },
		/**
         * JS BEAUTIFIER
         */
        jsbeautifier: {
            dist: {
                files: {
                    src: [JS_FILES_PATTERN],
                }
            },
            options: {
                config: '.jsbeautifyrc'
            }
        },
		htmlbuild: {
            options: {
                beautify: true,
                relative: true,
                scripts: {
                    bundle: [
                        DIST_PATH + 'js/vendor.js',
                        DIST_PATH + 'js/app.js',
                        DIST_PATH + 'js/templates.js',
                    ],
                },
                styles: {
                    bundle: [
                        DIST_PATH + 'css/vendor.css',
                        DIST_PATH + 'css/app.css',
                    ]
                },
            },
            dist: {
                src: ['app/index.html'],
                dest: DIST_PATH,
                options: {
					sections: {
						layout: {
							analytics: ['layouts/analytics.html'],
						}
					},
                }
            },
			dev: {
                src: ['app/index.html'],
                dest: DIST_PATH,
                options: {
					sections: {
						layout: {
							analytics: ['nothing.html'],
						}
					},
                }
            },
        },
		ngtemplates: {
            options: {
                module: 'app',
            },
            dist: {
				cwd: 'app',
                src: [HTML_FILES],
                dest: DIST_PATH + 'js/templates.js',
            }
        },
		svgstore: {
			dist:{
				files: {
					'dist/images/symbols.svg':[
						'assets/svg/symbols/*.svg',
					],
					'dist/images/actions.svg': [
						'assets/svg/actions/*.svg',
					]
				},
				
			},
		},
		clean: {
            dist: [DIST_PATH + '**'],
        },
	});

	grunt.registerTask('build', 'build application', 
		['clean', 'sass', 'concat', 'ngtemplates', 'svgstore', 'htmlbuild:dev']);
	grunt.registerTask('build-dist', 'build application', 
		['clean', 'sass', 'concat', 'ngtemplates', 'svgstore', 'htmlbuild:dist']);
}
