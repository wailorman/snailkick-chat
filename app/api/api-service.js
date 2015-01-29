define(
    [
        'app',
        'promise'
    ],
    function ( app, Promise ) {

        return app.service( 'apiService', function ( $resource, $rootScope, authService, $q ) {

            var apiService = this;

            var apiAddress = 'http://pc.wailorman.ru:1515';

            var Messages = $resource( apiAddress + '/messages', null, {
                query: { method: 'GET', isArray: true },
                post:  { method: 'POST', headers: { token: authService.token ? authService.token : null } }
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

                        //console.log( 'Messages query resolve' );

                        //console.log( messages[0] );

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

                });

            };

            apiService.sendMessage = function ( messageText ) {
            };

        } );

    }
);