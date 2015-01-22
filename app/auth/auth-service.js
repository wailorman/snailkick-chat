define(
    [
        'app'
    ],
    function ( app ) {

        console.log( 'auth' );

        var vkAuthPage = 'http://pc.wailorman.ru:1515/auth/vk';

        return app.service( 'authService', function( $window, $cookies ){

            /** @namespace $cookies.token */

            this.redirectToVkAuthPage = function () {

                $window.location.href = vkAuthPage;

            };

            if ( $cookies.token ) this.token = $cookies.token;

        } );

    }
);