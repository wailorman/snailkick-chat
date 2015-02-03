define(
    [
        'angular',
        'angular-route',
        'angular-resource',
        'angular-cookies',
        'angular-scroll-glue',
        'angular-local-storage',
        'angular-bootstrap-tpls'
    ],
    function ( angular ) {

        //console.log( 'app' );

        return angular.module( 'snailkickChat', [
            'ngRoute',
            'ngResource',
            'ngCookies',
            'luegg.directives',
            'LocalStorageModule',
            'ui.bootstrap'
        ] );

    }
);