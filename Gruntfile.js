module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var coffeeFiles = [
        'coffee/presenter.coffee',
        'coffee/index_presenter.coffee',
    ];

    // Project configuration
    grunt.initConfig({
        coffee: {
            dev: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    'dev/all.js': coffeeFiles
                }
            },
            prod: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    'prod/all_original.js': coffeeFiles
                }
            }
        },
        jade: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    'dev/index.html': 'jade/index.jade',
                    'dev/hawaii/index.html': 'jade/hawaii.jade'
                }
            },
            prod: {
                options: {
                    pretty: true
                },
                files: {
                    'prod/index.html': 'jade/index.jade'
                }
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'dev/all.css': 'sass/all.scss'
                }
            },
            prod: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'prod/all.css': 'sass/all.scss'
                }
            }
        },
        watch: {
            coffee: {
                files: 'coffee/**/*.coffee',
                tasks: ['coffee'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            jade: {
                files: 'jade/**/*.jade',
                tasks: ['jade'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        },
        concurrent: {
            dist: {
                tasks: ['watch:coffee:dev', 'watch:sass:dev', 'watch:jade:dev'],
                options: {
                    logConcurrentOutput: true,
                    limit: 3
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'prod/all.js': 'prod/all_original.js'
                }
            }
        }
    });

    grunt.registerTask('default', 'concurrent');

    grunt.registerTask('dev', [
        'coffee:dev',
        'jade:dev',
        'sass:dev'
    ]);

    grunt.registerTask('prod', [
        'coffee:prod',
        'jade:prod',
        'sass:prod',
        'uglify'
    ]);
};
