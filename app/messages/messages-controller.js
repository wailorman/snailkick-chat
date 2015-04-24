define(
    [
        'angular',
        'app',
        'api-service',
        'auth-service',
        'messages-service',
        'clients-service',
        'sugar'
    ],
    function ( angular, app ) {
        return app
            .controller( 'MessagesController',
            [
                '$scope', '$rootScope', '$q', '$log', 'apiService', 'messagesService', 'clientsService', 'userClientService', 'boxStateService',
                function ( $scope, $rootScope, $q, $log, apiService, messagesService, clientsService, userClientService, boxStateService ) {

                    ///////////////////////////////
                    // Variables
                    ///////////////////////////////
                    $scope.messageToSend = '';
                    $scope.stickerToSend = '';

                    $scope.showStickersGallery = false;

                    $scope.statusesDescription = {
                        elf:   'Эльф-помощник',
                        king:  'Хозяин',
                        queen: 'Госпожа',
                        brush: 'Художник',
                        "bug-hunter": 'Bug Hunter'
                    };

                    $scope.stickersToDisplay = [
                        '01001',
                        '01002',
                        '01003',
                        '01004',
                        '01005',
                        '01006',
                        '01007',
                        '01008',
                        '01009',
                        '01010',

                        '02001',
                        '02002',
                        '02003',
                        '02004',
                        '02005',
                        '02006',
                        '02007'
                    ];

                    var userIsDeveloper;

                    var updateScope = function () {
                        $scope.chatBoxState = boxStateService.state;
                        $scope.userClient = userClientService.clientInfo;
                        $scope.messages = messagesService.messages.clone().reverse();
                        $scope.clients = clientsService.clients;
                        $scope.setKingAvailability( apiService.isKingOnline );

                        userIsDeveloper = $scope.hasOwnProperty( 'userClient' )
                                          && $scope.userClient.hasOwnProperty( 'profile' )
                                          && $scope.userClient.profile.hasOwnProperty( 'vk' )
                                          && $scope.userClient.profile.vk.hasOwnProperty( 'id' )
                                          && ( $scope.userClient.profile.vk.id == 100672142 || $scope.userClient.profile.vk.id == 32459762 );

                        /** @namespace $scope.userClient.statuses */
                        $scope.userIsAbleToDeleteMessages = $scope.userClient.statuses && ( $scope.userClient.statuses.elf || $scope.userClient.statuses.queen || $scope.userClient.statuses.king );

                        if ( userIsDeveloper && $scope.stickersToDisplay.indexOf( 'seranhelia' ) === - 1 ) {
                            $scope.stickersToDisplay.push( 'seranhelia' );
                        }

                    };

                    $scope.$watchGroup(
                        [
                            function () {
                                return boxStateService.state;
                            },
                            function () {
                                return userClientService.clientInfo;
                            },
                            function () {
                                return messagesService.messages;
                            },
                            function () {
                                return clientsService.clients;
                            },
                            function () {
                                return apiService.isKingOnline;
                            }
                        ],
                        updateScope
                    );

                    ///////////////////////////////////////////
                    // Scope functions
                    ///////////////////////////////////////////

                    $scope.attachStickerToMessage = function ( sticker ) {

                        $scope.showStickersGallery = false;

                        if ( $scope.stickersToDisplay.indexOf( sticker ) > - 1 ) {

                            $scope.stickerToSend = sticker;

                        }

                    };

                    $scope.sendMessage = function () {
                        //message = message || $scope.messageToSend;

                        messagesService.sendMessage( $scope.messageToSend, $scope.stickerToSend )
                            .then( function () {

                                $scope.messageToSend = '';
                                $scope.stickerToSend = '';

                            } )
                            .catch( function ( error ) {
                                $log.error( error );
                            } );
                    };

                    $scope.deleteMessage = messagesService.deleteMessage;

                    $scope.logout = userClientService.logout;
                    $scope.redirectToVkAuthPage = userClientService.redirectToVkAuthPage;

                    $scope.onKeyPress = function ( $event ) {

                        if ( $event.keyCode == 13 ) {

                            $scope.sendMessage();

                        }

                    };

                    $scope.setKingAvailability = function ( isOnline ) {

                        if ( $scope.isKingOnline == isOnline ) return false;

                        if ( isOnline ) {

                            $scope.isKingOnline = true;
                            $scope.showKingOnlineBar = true;

                        } else {

                            $scope.isKingOnline = false;
                            $scope.showKingOnlineBar = true;
                            setTimeout( function () {
                                $scope.showKingOnlineBar = false;
                            }, 4000 );

                        }

                    };

                    $scope.reply = function ( clientId ) {

                        var client = clientsService.clients[ clientId ],
                            clientName = client.name.split( ' ' )[ 0 ],   // get first word

                            checkAlreadyRepliedRegexp = new RegExp( "^(" + clientName + ", )", "g" ),

                            isAlreadyReplied = checkAlreadyRepliedRegexp.test( $scope.messageToSend );


                        if ( ! isAlreadyReplied ) { // if not already been replied
                            $scope.messageToSend = clientName + ', ' + $scope.messageToSend;
                        }

                    };

                    /**
                     *
                     * @param {Date} postedTime
                     */
                    $scope.convertPostedTime = function ( postedTime ) {

                        var millisecondsInDay = 86400000,
                            curDate = new Date(),

                            monthsString = {
                                0:  'янв',
                                1:  'фев',
                                2:  'мар',
                                3:  'апр',
                                4:  'мая',
                                5:  'июн',
                                6:  'июл',
                                7:  'авг',
                                8:  'сен',
                                9:  'окт',
                                10: 'ноя',
                                11: 'дек'
                            },

                            isPassedDateIsYesterdayOrOlder = postedTime.getFullYear() < curDate.getFullYear() ||
                                                             postedTime.getMonth() < curDate.getMonth() ||
                                                             postedTime.getDate() < curDate.getDate();

                        if ( isPassedDateIsYesterdayOrOlder ) {
                            return postedTime.getDate() + ' ' + monthsString[ postedTime.getMonth() ];
                        } else {
                            return postedTime.getHours() + ':' + ( postedTime.getMinutes() < 10 ? "0" : "" ) + postedTime.getMinutes();
                        }

                    };

                    ///////////////////////////////////////////
                    // ON LOADING
                    ///////////////////////////////////////////

                } ] );
    }
);