define(
    [
        'angular',
        'app'
    ],
    function ( angular, app ) {
        app.service( 'clientsService', function ( $rootScope, $resource, apiService, $q ) {

                var clientsService = this;

                clientsService.clients = [];

                /**
                 * Cache Client
                 *
                 * @param clientId
                 * @returns {Promise} reject() ; resolve()
                 */
                clientsService.cacheClient = function ( clientId ) {

                    return $q( function ( resolve, reject ) {

                        // no passed id
                        if ( ! clientId ) return reject();

                        // this client do not need to cache himself
                        if ( clientsService.clients[ clientId ] ) return resolve();

                        apiService.getClientById( clientId ).then( function ( receivedClient ) {

                            clientsService.clients.push( receivedClient );

                            clientsService.broadcastChangesInClientsCache();

                            return resolve();

                        } );

                    } );

                };

                clientsService.broadcastChangesInClientsCache = function () {
                    $rootScope.$broadcast( 'clientsService:cache update' );
                }

            }
        );
    }
);