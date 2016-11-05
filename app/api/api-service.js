define(
    [
        'app'
    ],
    function ( app ) {

        return app
            .service( 'apiService', [
                '$resource', '$rootScope', '$q', '$log', '$http', '$cookies', '$location', '$window', 'authService', 'userTokenService',
                function ( $resource, $rootScope, $q, $log, $http, $cookies, $location, $window, authService, userTokenService ) {

                    var apiService = this;

                    apiService.available = false;

                    //if ( $window.location.toString().match(/local/gi) ){
                    if ( document.location.origin.match(/local/gi) )
                        apiService.apiUrl = 'http://localhost:1515';
                    else
                        apiService.apiUrl = 'https://snailkick-chat-backend.herokuapp.com';

                    var Messages = $resource( apiService.apiUrl + '/messages', {}, {
                        query: { method: 'GET', isArray: true, params: { 'token': userTokenService.get() } },
                        send:  { method: 'POST', isArray: false, params: { 'token': userTokenService.get() } }
                    } );
                    var Client = $resource( apiService.apiUrl + '/clients/:idOrToken' );

                    var KingAvailability = $resource( apiService.apiUrl + '/is-king-online' );



                    apiService.updateKingAvailability = function () {

                        KingAvailability.get().$promise
                            .then( function ( result ) {

                                apiService.isKingOnline = result.isKingOnline;

                            } )
                            .catch( function ( error ) {

                                apiService.isKingOnline = false;

                                if ( error && error.status == 0 ) {
                                    apiService.changeApiAvailability( false );
                                }

                            } );

                    };

                    apiService.changeApiAvailability = function ( state ) {

                        if ( state !== apiService.available ) {
                            apiService.available = state;
                            $rootScope.$broadcast( 'api availability change' );
                        }

                    };

                    apiService.catchApiUnavailable = function ( parentPromise ) {

                        parentPromise
                            .then( function () {

                                apiService.changeApiAvailability( true );

                            } )
                            .catch( function ( error ) {

                                if ( error && error.status == 0 ) {
                                    apiService.changeApiAvailability( false );
                                }

                            } );

                    };

                    /**
                     * Get last N messages from API
                     *
                     * @param limit     default to 100
                     *
                     * @return {Promise} resolve( messages ) ; reject()
                     */
                    apiService.getLastMessages = function ( limit ) {

                        return $q( function ( resolve, reject ) {

                            if ( ! limit ) limit = 100;

                            var deferredQuery = Messages.query( { limit: limit } ).$promise;

                            deferredQuery.then( function ( messages ) {

                                resolve( messages );

                            } );
                            deferredQuery.catch( function ( error ) {

                                reject( error );

                            } );

                            apiService.catchApiUnavailable( deferredQuery );

                        } );

                    };

                    /**
                     * Get Client by id from API
                     *
                     * @param idOrToken
                     * @returns {Promise} resolve( client ) ; reject()
                     */
                    apiService.getClient = function ( idOrToken ) {

                        return $q( function ( resolve, reject ) {

                            if ( ! idOrToken ) return reject();

                            var deferredQuery = Client.get( { idOrToken: idOrToken } ).$promise;

                            deferredQuery.then( function ( receivedClient ) {

                                resolve( receivedClient );

                            } );
                            deferredQuery.catch( function ( error ) {

                                reject( error );

                            } );

                            apiService.catchApiUnavailable( deferredQuery );

                        } );

                    };


                    apiService.sendMessage = function ( messageText, sticker ) {

                        return $q( function ( resolve, reject ) {

                            if ( ! userTokenService.get() ) return reject( new Error( 'Token is not defined!' ) );

                            var messageToSend = new Messages();
                            messageToSend.text = messageText;

                            if ( sticker ) messageToSend.sticker = sticker;

                            var deferredSending = messageToSend.$send();

                            deferredSending.then( function () {

                                resolve();

                            } );
                            deferredSending.catch( function ( errorMessage ) {

                                $log.error( errorMessage );

                            } );

                            apiService.catchApiUnavailable( deferredSending );

                        } );

                    };

                } ] );

    }
);