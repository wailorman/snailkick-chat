define(
    [
        'app',
        'async',

        'clients-service'
    ],
    function ( app, async ) {
        return app.service( 'messagesService', function ( $rootScope, apiService, authService, clientsService, $q ) {

            var messagesService = this;

            /**
             * Call callback(true) if added some new messages.
             * And callback(false) if no any new messages
             *
             * @return {Promise} resolve() if some new messages; reject() if no new messages
             */
            messagesService.isAnyNewMessages = function () {

                return $q( function ( resolve, reject ) {

                    apiService.getLastMessages( 1 ).then( function ( receivedMessages ) {

                        // if no messages - new!
                        if ( ! messagesService.messages || messagesService.messages.length == 0 ) return resolve();

                        var lastLocalMessage = messagesService.messages[ 0 ];

                        var lastApiMessage = receivedMessages[ 0 ];


                        // If no new messages
                        if ( lastLocalMessage.id == lastApiMessage.id ) {
                            console.log( 'isAnyNewMessages: no new messages' );
                            return reject();
                        }

                        // If some new messages
                        if ( lastLocalMessage.id != lastApiMessage.id ) {
                            console.log( 'isAnyNewMessages: some new messages' );
                            return resolve();
                        }

                    }, function ( error ) {
                        console.log( error );
                        reject();
                    } );

                } );

            };

            /**
             * Parse received from API messages. Add viewPostedTime, cache clients
             *
             * @param messages
             * @returns {Promise} resolve( parsedMessages )
             */
            messagesService.parseMessages = function ( messages ) {

                return $q( function ( resolve, reject ) {

                    if ( ! messages ) messages = messagesService.messages;

                    async.each(
                        messages,
                        function ( message, ecb ) {

                            message.posted = new Date( message.posted );

                            message.viewPostedTime = message.posted.getHours() + ':' +
                                                     ( message.posted.getMinutes() < 10 ? "0" : "" ) + message.posted.getMinutes();

                            clientsService.cacheClient( message.client );

                            ecb();

                        },
                        function () {
                            return resolve( messages );
                        }
                    );

                } );


            };

            messagesService.broadcastChangesInMessageList = function () {

                $rootScope.$broadcast( 'messagesService:messages_update' );

            };

            /**
             * Check for updates in messages
             *
             * @returns {Promise} resolve() on finish refreshing
             */
            messagesService.refresh = function () {

                return $q( function ( resolve, reject ) {

                    messagesService.isAnyNewMessages()
                        .then( function () {

                            // get new message!
                            console.log( 'new message!' );

                            apiService.getLastMessages( 100 )
                                .then( function ( receivedMessages ) {

                                    messagesService.parseMessages( receivedMessages )
                                        .then( function ( parsedMessages ) {

                                            messagesService.messages = parsedMessages;
                                            messagesService.broadcastChangesInMessageList();
                                            resolve();

                                        } );

                                } )
                                .catch( reject );

                        } )
                        .catch( reject );

                } );


            };

            messagesService.sendMessage = function ( messageText ) {

                return $q( function ( resolve, reject ) {

                    if ( ! messageText ) return reject( new Error( 'messageText is empty!' ) );

                    apiService.sendMessage( messageText )
                        .then( function () {
                            // success
                            messagesService.refresh();
                            resolve();
                        } )
                        .catch( function ( error ) {
                            reject( error );
                        } );

                } );

            };

            messagesService.refreshInterval = setInterval( function () {

                messagesService.refresh();

            }, 1500 );

        } );
    }
);