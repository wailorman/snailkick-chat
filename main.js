require.config( {

    paths: {
        'angular':          'bower_components/angular/angular',
        'angular-route':    'bower_components/angular-route/angular-route',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-cookies':  'bower_components/angular-cookies/angular-cookies',
        'async':            'bower_components/async/lib/async',

        'app': 'app/app',

        'auth-service': 'app/auth/auth-service',
        'api-service': 'app/api/api-service',
        'messages-service': 'app/messages/messages-service',

        'messages-controller': 'app/messages/messages-controller',

        'snailkick-chat-directive': 'app/chat-box/main-directive'
    },

    shim: {

        'angular': {
            exports: 'angular'
        },

        'angular-route':    [ 'angular' ],
        'angular-resource': [ 'angular' ],
        'angular-cookies': [ 'angular' ]

    }

} );

require(
    [
        'angular',

        'app',

        'auth-service',

        'snailkick-chat-directive'
    ],
    function () {

        console.log( 'main' );

        angular.bootstrap( document.getElementById( 'ng-snailkick-chat' ), [ 'snailkickChat' ] );

    }
);