module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var coffeeFiles = [
        'unit',
        'binder',
        'image_list_widget',
        'presenter',
        'rx_presenter',
        'index_presenter',
        'insight_presenter'
    ];

    for (var i = 0, s = coffeeFiles.length; i < s; i++) {
        var e = coffeeFiles[i];
        e = "coffee/" + e + ".coffee";
        coffeeFiles[i] = e;
    }

    var places = [
        { name: 'palm-springs', date: '2019' },
        { name: 'italy', date: '2018' },
        { name: 'mexico', date: '2018' },
        { name: 'costa-rica', date: '2017' },
        // { name: 'bali', date: '2017' },
        // { name: 'hawaii', date: '2017' },
        // { name: 'tuscon', date: '2017' },
        // { name: 'dc', date: '2016' },
        // { name: 'seattle', date: '2016' },
        // { name: 'spain-portugal', date: '2016' },
        // { name: 'arizona', date: '2015' },
        // { name: 'chicago', date: '2015' },
        // { name: 'nyc', date: '2015' },
        // { name: 'sf', date: '2015' }
    ];

    var devFiles = {}, prodFiles = {};

    for (var i = 0, s = places.length; i < s; i++) {
        var p = places[i];
        var output = p.name + "-" + p.date + "/index.html";
        var input = "pug/" + p.name + ".pug";
        devFiles["dev/" + output] = input;
        prodFiles["prod/" + output] = input;
    }

    devFiles["dev/index.html"] = "pug/index.pug";
    prodFiles["prod/index.html"] = "pug/index.pug";

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
        pug: {
            dev: {
                options: {
                    pretty: true
                },
                files: devFiles
            },
            prod: {
                options: {
                    pretty: true
                },
                files: prodFiles
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
            pug: {
                files: 'pug/**/*.pug',
                tasks: ['pug'],
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
                tasks: ['watch:coffee:dev', 'watch:sass:dev', 'watch:pug:dev'],
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
        'pug:dev',
        'sass:dev'
    ]);

    grunt.registerTask('prod', [
        'coffee:prod',
        'pug:prod',
        'sass:prod',
        'uglify'
    ]);
};
