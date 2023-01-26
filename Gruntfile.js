var createIndex = function (grunt, taskname) {
    'use strict';
    var conf = grunt.config('index')[taskname],
        tmpl = grunt.file.read(conf.template);

    // register the task name in global scope so we can access it in the .tmpl file
    grunt.config.set('currentTask', { name: taskname });

    grunt.file.write(conf.dest, grunt.template.process(tmpl));
    grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.template + '\'');
};

/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    // Project configuration.

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Metadata.
        pkg: {
            title: 'MDwiki',
            name: 'mdwiki',
            version: '0.6.4'
        },

        ownJsFiles: [
            'js/marked.js',
            'js/init.js',
            'js/logging.js',
            'js/stage.js',
            'js/main.js',
            'js/util.js',
            'js/modules.js',
            'js/basic_skeleton.js',
            'js/bootstrap.js',
            'js/gimmicker.js',

            // gimmicks
            'js/gimmicks/alerts.js',
            'js/gimmicks/colorbox.js',
            'js/gimmicks/carousel.js',
            'js/gimmicks/disqus.js',
            'js/gimmicks/facebooklike.js',
            'js/gimmicks/forkmeongithub.js',
            //'js/gimmicks/github_gist.js',
            'js/gimmicks/gist.js',
            'js/gimmicks/googlemaps.js',
            'js/gimmicks/iframe.js',
            'js/gimmicks/math.js',
            'js/gimmicks/prism.js',
            // 'js/gimmicks/leaflet.js',
            'js/gimmicks/themechooser.js',
            'js/gimmicks/twitter.js',
            'js/gimmicks/youtube_embed.js',
            'js/gimmicks/chart.js',
            'js/gimmicks/yuml.js'
        ],

        // files that we always inline (stuff not available on CDN)
        internalCssFiles: [
            'extlib/css/colorbox.css'
        ],
        // ONLY PUT ALREADY MINIFIED FILES IN HERE!
        internalJsFiles: [
            'extlib/js/jquery.colorbox.min.js'
        ],

        // files that we inline in the fat release (basically everything)
        // ONLY PUT ALREADY MINIFIED FILES IN HERE!
        externalJsFiles: [
            'extlib/js/jquery-1.8.3.min.js',
            'extlib/js/bootstrap-3.0.0.min.js',
            'extlib/js/prism.1.4.1.min.js'
        ],
        externalCssFiles: [
            'extlib/css/bootstrap-3.0.0.min.css',
            'extlib/css/prism.1.4.1.default.min.css'
        ],

        // references we add in the slim release (stuff available on CDN locations)
        externalJsRefs: [
            'ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js',
            'netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js',
            'raw.azureedge.net/joelself/mdwiki/0.6.x.0/extlib/js/prism.1.4.1.min.js'
        ],
        externalCssRefs: [
            'netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css',
            'raw.azureedge.net/joelself/mdwiki/0.6.x.0/extlib/css/prism.1.4.1.default.min.css'
            //            'www.3solarmasses.com/retriever-bootstrap/css/retriever.css'
            //            '3solarmasses.com/corgi-bootstrap/css/corgi.css'
        ],

        concat: {
            options: {
                //banner: '<%= banner %>',
                stripBanners: true
            },
            dev: {
                src: '<%= ownJsFiles %>',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dev.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        index: {
            fat: {
                template: 'src/index.ejs',
                dest: 'dist/mdwiki.html'
            },
            slim: {
                template: 'src/index.ejs',
                dest: 'dist/mdwiki-slim.html'
            },
            debug: {
                template: 'src/index.ejs',
                dest: 'dist/mdwiki-debug.html'
            }
        },
        /* make it use .jshintrc */
        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    marked: true,
                    google: true,
                    hljs: true,
                    /* leaflet.js*/
                    L: true,
                    console: true,
                    Chart: true,
                    Prism: true
                }
            },
            /*gruntfile: {
                src: 'Gruntfile.js'
            },*/
            js: {
                src: ['js/*.js', 'js/**/*.js', '!js/marked.js']
            }
        },
        lib_test: {
            src: ['lib/**/*.js', 'test/**/*.js']
        },
        copy: {
            release_fat: {
                expand: false,
                flatten: true,
                src: ['dist/mdwiki.html'],
                dest: 'release/mdwiki-<%= grunt.config("pkg").version %>/mdwiki.html'
            },
            release_slim: {
                expand: false,
                flatten: true,
                src: ['dist/mdwiki-slim.html'],
                dest: 'release/mdwiki-<%= grunt.config("pkg").version %>/mdwiki-slim.html'
            },
            release_debug: {
                expand: false,
                flatten: true,
                src: ['dist/mdwiki-debug.html'],
                dest: 'release/mdwiki-<%= grunt.config("pkg").version %>/mdwiki-debug.html'
            },
            release_assets: {
                expand: true,
                flatten: true,
                src: ['src/release_assets/*'],
                dest: 'release/mdwiki-<%= grunt.config("pkg").version %>/'
            },
            dist: {
                expand: true,
                cwd: 'dist',
                src: '**/*[!_].html',
                dest: 'docs/'
            },
        },
        shell: {
            zip_release: {
                options: {
                    stdout: true
                },
                command: 'cd release && zip -r mdwiki-<%= grunt.config("pkg").version %>.zip mdwiki-<%= grunt.config("pkg").version %>'
            }
        },
        watch: {
            files: [
                'Gruntfile.js',
                'js/*.js',
                'js/**/*.js',
                'src/index.ejs'
            ],
            tasks: ['devel']
        },
    });

    grunt.registerTask('index_slim', 'Generate slim mdwiki.html, most scripts on CDN', function () {
        createIndex(grunt, 'slim');
    });

    grunt.registerTask('index_fat', 'Generate mdwiki-fat.html, inline all scripts', function () {
        createIndex(grunt, 'fat');
    });
    grunt.registerTask('index_debug', 'Generate mdwiki-fat.html, inline all scripts', function () {
        createIndex(grunt, 'debug');
    });
    grunt.registerTask('release-slim', [/* 'jshint', */ 'concat:dev', 'uglify:dist', 'index_slim']);
    grunt.registerTask('release-fat', [/* 'jshint', */ 'concat:dev', 'uglify:dist', 'index_fat']);

    /* Debug is basically the fat version but without any minifing */
    grunt.registerTask('release-debug', [/* 'jshint', */ 'concat:dev', 'index_debug']);

    grunt.registerTask('devel', ['release-debug', 'reload', 'watch']);

    grunt.registerTask('release', [
        'release-slim', 'release-fat', 'release-debug',
        'copy:release_slim', 'copy:release_fat', 'copy:release_debug', 'copy:release_assets',
        'shell:zip_release'
    ]);
    // Default task.
    grunt.registerTask('default',
        ['release-slim', 'release-fat', 'release-debug']
    );

};
