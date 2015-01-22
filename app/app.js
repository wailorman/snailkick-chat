define(
    [
        'angular',
        'angular-route',
        'angular-resource',
        'angular-cookies'
    ],
    function ( angular ){

        console.log( 'app' );

        return angular.module( 'snailkickChat', [
            'ngRoute',
            'ngResource',
            'ngCookies'
        ] );

    }
);