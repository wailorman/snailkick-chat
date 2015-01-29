define(
    [
        'angular',
        'angular-route',
        'angular-resource',
        'angular-cookies',
        'angular-scroll-glue'
    ],
    function ( angular ){

        //console.log( 'app' );

        return angular.module( 'snailkickChat', [
            'ngRoute',
            'ngResource',
            'ngCookies',
            'luegg.directives'
        ] );

    }
);