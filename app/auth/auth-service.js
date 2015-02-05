define(
    [
        'app'
    ],
    function ( app ) {

        console.log( 'auth' );


        return app
            .service( 'authService', [
                '$window', '$cookies', '$cookieStore', '$location',
                function ( $window, $cookies, $cookieStore, $location ) {

                    var authService = this;

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


                } ] )

            .service( 'userTokenService', [
                '$rootScope', '$cookies', '$cookieStore', '$log', 'localStorageService',
                function ( $rootScope, $cookies, $cookieStore, $log, localStorageService ) {

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

                } ] )

            .service( 'userClientService', [
                '$q', '$rootScope', '$log', '$window', '$location', 'userTokenService', 'apiService',
                function ( $q, $rootScope, $log, $window, $location, userTokenService, apiService ) {

                    console.log( "" + $window.location + " ." );

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

                        $window.location.href = apiService.apiUrl + '/auth/vk?rto=' + $window.location;

                    };


                    /////////////////////////////////

                    userClientService.getUserClientInfo();


                    $rootScope.$on(
                        'api availability change',
                        userClientService.getUserClientInfo
                    );

                } ] );

    }
);