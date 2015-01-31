define(
    [
        'app'
    ],
    function ( app ) {

        console.log( 'auth' );



        return app
            .service( 'authService', function ( $window, $cookies, $cookieStore, $location ) {

                var authService = this;

                var vkAuthPage = 'http://' + $location.host() + '/:1515/auth/vk';

                /** @namespace $cookies.token */

                    //////////////////////////////
                    // Variables
                    //////////////////////////////

                authService.token = $cookies.token || null;


                ///////////////////////////////
                // Functions
                ///////////////////////////////

                authService.isUserLoggedIn = function () {

                    return $cookies.token != false;

                };

                authService.redirectToVkAuthPage = function () {

                    $window.location.href = vkAuthPage;

                };

                authService.logout = function () {

                    $cookieStore.remove( 'token' );
                    $window.location.reload();

                };


                ///////////////////////////////
                // Pre load actions
                ///////////////////////////////


            } )

            .service( 'userTokenService', function ( $rootScope, $cookies, $cookieStore, $log,
                                                     localStorageService ) {

                var userTokenService = this;

                userTokenService.token = null;

                userTokenService.get = function () {

                    if ( ! localStorageService.get( 'token' ) && $cookies.token )
                        localStorageService.set( 'token', $cookies.token );

                    return localStorageService.get( 'token' );

                };

                userTokenService.remove = function () {

                    return localStorageService.remove( 'token' );

                };

            } )

            .service( 'userClientService', function ( $q, $rootScope, $log, $window, $location,
                                                      userTokenService, apiService ) {

                var userClientService = this;

                //////////////////////////
                // Variables
                //////////////////////////

                userClientService.isLoggedIn = false;
                userClientService.clientInfo = {};


                //////////////////////////
                // Functions
                //////////////////////////

                userClientService.getUserClientInfo = function () {

                    return $q( function ( resolve, reject ) {

                        if ( ! userTokenService.get() ) return reject( new Error( 'token is not defined' ) );

                        apiService.getClient( userTokenService.get() )
                            .then( function ( client ) {

                                // I can find client by this token!

                                userClientService.saveUserClientData( client );
                                resolve( client );

                            } )
                            .catch( function ( error ) {

                                if ( error.status === 404 ) {
                                    userClientService.logout();
                                }

                            } );

                    } );

                };

                userClientService.saveUserClientData = function ( client ) {

                    userClientService.clientInfo = client;
                    userClientService.isLoggedIn = true;

                };

                userClientService.logout = function () {

                    userClientService.isLoggedIn = false;
                    userTokenService.remove();

                };

                userClientService.redirectToVkAuthPage = function () {

                    $window.location.href = 'http://' + $location.host() + ':1515/auth/vk';

                };


                /////////////////////////////////

                userClientService.getUserClientInfo();


                $rootScope.$on(
                    'api availability change',
                    userClientService.getUserClientInfo
                );

            } );

    }
);