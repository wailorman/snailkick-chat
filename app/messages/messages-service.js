define(
    [
        'app',
        'async',

        'clients-service'
    ],
    function ( app, async ) {
        return app.service( 'messagesService', function ( $rootScope, apiService, authService, clientsService, $q ) {

            var messagesService = this;

            messagesService.messages = [
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Что-то по-русски',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquad',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquad',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                }
            ];

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
                        if ( messagesService.messages.length == 0 ) return resolve();

                        var lastLocalMessage = messagesService.messages[ 0 ];

                        var lastApiMessage = receivedMessages[ 0 ];


                        // If no new messages
                        if ( lastLocalMessage.id == lastApiMessage.id ) return reject();

                        // If some new messages
                        if ( lastLocalMessage.id != lastApiMessage.id ) return resolve();

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

            messagesService.refreshInterval = setInterval( function () {

                messagesService.refresh();

            }, 1500 );

        } );
    }
);