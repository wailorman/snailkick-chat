module.exports = function ( grunt ) {

    grunt.initConfig( {

        requirejs: {
            compile: {
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

        copy: {
            images: {
                src:     'images/*',
                dest:    'built/images',
                flatten: true,
                expand:  true
            },
            fonts:  {
                src:     'fonts/*',
                dest:    'built/fonts',
                flatten: true,
                expand:  true
            }
        },

        cssmin: {
            stable: {
                files: {
                    'built/build.css': [ 'bower_components/bootstrap/dist/css/bootstrap.min.css', 'css/main.css' ]
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

        htmlbuild: {
            stable: {
                src:     'index.html',
                dest:    'built/',
                options: {
                    relative: true,
                    scripts:  {
                        appBuild: 'built/app.build.js'
                    },
                    styles:   {
                        concatCss: 'built/build.css'
                    }
                }
            }
        },

        ngmin: {

            snailkickChat: {

                src:  [ 'app/messages/messages-service.js' ],
                dest: 'app/messages/messages-service.ngmin.js'

            }

        },

        uglify: {
            snailkickChat: {
                files: {
                    'built/app.build.min.js': [ 'built/app.build.js' ]
                }
            }
        },

        cssUrlEmbed: {
            encodeDirectly: {
                files: {
                    'built/build.css': ['built/build.css']
                }
            }
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

    grunt.task.registerTask( 'default', [ 'requirejs', 'less', 'copy', 'cssmin', 'htmlbuild', 'cssUrlEmbed' ] );

};