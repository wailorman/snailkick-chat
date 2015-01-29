define(
    [
        'app'
    ],
    function ( app ) {

        return app.service( 'apiService', function ( $resource, $rootScope, authService, $q, $log, $http, $cookies ) {

            var apiService = this;

            var apiAddress = 'http://pc.wailorman.ru:1515';

            var Messages = $resource( apiAddress + '/messages', {}, {
                query: { method: 'GET', isArray: true },
                send:  { method: 'POST', isArray: false, params: { 'token': $cookies.token } }
            } );

            var Client = $resource( apiAddress + '/clients/:id' );

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

                    Messages.query( { limit: limit } ).$promise.then( function ( messages ) {

                        resolve( messages );

                    }, function ( error ) {

                        reject( error );

                    } );

                } );

            };

            /**
             * Get Client by id from API
             *
             * @param id
             * @returns {Promise} resolve( client ) ; reject()
             */
            apiService.getClientById = function ( id ) {

                return $q( function ( resolve, reject ) {

                    if ( ! id ) return reject();

                    Client.get( { id: id } ).$promise.then( function ( receivedClient ) {

                        resolve( receivedClient );

                    }, function ( error ) {

                        reject( error );

                    } );

                } );

            };

            apiService.sendMessage = function ( messageText ) {

                return $q( function ( resolve, reject ) {

                    if ( ! authService.token ) return reject( new Error( 'Token is not defined!' ) );

                    var messageToSend = new Messages();
                    messageToSend.text = messageText;

                    messageToSend.$send()
                        .then( function () {

                            resolve();

                        } )
                        .catch( function ( errorMessage ) {

                            $log.error( errorMessage );

                        } );

                } );

            };

        } );

    }
);