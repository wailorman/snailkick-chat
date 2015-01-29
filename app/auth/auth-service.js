define(
    [
        'app'
    ],
    function ( app ) {

        console.log( 'auth' );

        var vkAuthPage = 'http://pc.wailorman.ru:1515/auth/vk';

        return app.service( 'authService', function ( $window, $cookies, $http ) {

            /** @namespace $cookies.token */

            this.redirectToVkAuthPage = function () {

                $window.location.href = vkAuthPage;

            };

            this.token = $cookies.token || null;

            this.getToken = function () {
                return $cookies.token;
            };

            //$http.defaults.headers.common[ 'Api-Token' ] = $cookies.token || "null!";
            //$http.defaults.headers.common[ 'Access-Control-Allow-Origin' ] = "*";

        } );

    }
);