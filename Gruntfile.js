module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            release: {
                options: {
                    baseUrl:                '.',
                    name:                   'main',
                    mainConfigFile:         "./main.js",
                    out:                    "built/app.build.js",
                    findNestedDependencies: true,
                    include:                [ 'bower_components/requirejs/require.js' ],
                    optimize:               'uglify'
                }
            },
            fast: {
                options: {
                    baseUrl:                '.',
                    name:                   'main',
                    mainConfigFile:         "./main.js",
                    out:                    "built/app.build.js",
                    findNestedDependencies: true,
                    include:                [ 'bower_components/requirejs/require.js' ],
                    optimize:               'none'
                }
            }
        },

        less: {
            compile: {
                files: {
                    "css/main.css": "css/main.less"
                }
            }
        },

        concat_css: {
            toEmb: {
                src:  [
                    'css/main.css'
                ],
                dest: "built/to-emb.css"
            },
            toMin: {
                src:  [
                    'built/build.embed.css',
                    'bower_components/bootstrap/dist/css/bootstrap.css'
                ],
                dest: "built/to-min.css"
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, flatten: true, src: [ 'bower_components/font-awesome/fonts/*' ], dest: 'fonts/', filter: 'isFile' }
                ]
            }
        },

        cssUrlEmbed: {
            encodeDirectly: {
                files: {
                    'built/build.embed.css': [ 'built/to-emb.css' ]
                }
            }
        },

        cssmin: {
            stable: {
                files: {
                    'built/build.css': [ 'built/to-min.css' ]
                }
            }
        },

        clean: {
            preBuild: [
                'built/*'
            ],
            postBuild: [
                'built/to-emb.css',
                'built/to-min.css',
                'built/build.embed.css',
                'built/concat.css',
                'fonts/font*',
                'fonts/Font*',
                'fonts/glyph*'
            ]
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-html-build' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-ng-annotate' );
    grunt.loadNpmTasks( 'grunt-ngmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-css-url-embed' );
    grunt.loadNpmTasks( 'grunt-concat-css' );

    grunt.task.registerTask( 'release', [
        'clean:preBuild',

        'requirejs:release',
        'less',
        'copy',

        'concat_css:toEmb',
        'cssUrlEmbed',
        'concat_css:toMin',
        'cssmin',

        'clean:postBuild'
    ] );

    grunt.task.registerTask( 'dev', [
        'clean:preBuild',

        'requirejs:fast',
        'less',
        'copy',

        'concat_css:toEmb',
        'cssUrlEmbed',
        'concat_css:toMin'
    ] );

};