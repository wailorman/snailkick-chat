require.config( {

    paths: {
        'angular':                'bower_components/angular/angular',
        'angular-route':          'bower_components/angular-route/angular-route',
        'angular-resource':       'bower_components/angular-resource/angular-resource',
        'angular-cookies':        'bower_components/angular-cookies/angular-cookies',
        'angular-scroll-glue':    'bower_components/angular-scroll-glue/src/scrollglue',
        'angular-local-storage':  'bower_components/angular-local-storage/dist/angular-local-storage',
        'angular-bootstrap':      'bower_components/angular-bootstrap/ui-bootstrap',
        'angular-bootstrap-tpls': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'async':                  'bower_components/async/lib/async',
        'sugar':                  'bower_components/sugarjs/release/sugar.min',

        'jquery': 'bower_components/jquery/dist/jquery.min',

        'app': 'app/app',

        'auth-service':     'app/auth/auth-service',
        'api-service':      'app/api/api-service',
        'messages-service': 'app/messages/messages-service',
        'clients-service':  'app/clients/clients-service',

        'messages-controller': 'app/messages/messages-controller',

        'main-directive': 'app/chat-box/main-directive'
    },

    shim: {

        'angular': {
            exports: 'angular',
            deps:    [ 'jquery' ]
        },

        'angular-route':       [ 'angular' ],
        'angular-resource':    [ 'angular' ],
        'angular-cookies':     [ 'angular' ],
        'angular-scroll-glue': [ 'angular' ],
        'angular-bootstrap-tpls':   [ 'angular' ],

        'app': [ 'angular' ]
    }

} );

require(
    [
        'angular',

        'app',

        'auth-service',

        'main-directive'
    ],
    function () {

        console.log( 'main' );

        angular.bootstrap( document.getElementById( 'ng-snailkick-chat' ), [ 'snailkickChat' ] );

    }
);