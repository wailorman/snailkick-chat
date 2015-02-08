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

                    $scope.statusesDescription = {
                        elf: 'Эльф-помощник',
                        king: 'Хозяин'
                    };

                    var updateScope = function () {
                        $scope.chatBoxState = boxStateService.state;
                        $scope.userClient = userClientService.clientInfo;
                        $scope.messages = messagesService.messages.clone().reverse();
                        $scope.clients = clientsService.clients;
                        $scope.setKingAvailability( apiService.isKingOnline );
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

                    $scope.sendMessage = function ( message ) {
                        message = message || $scope.messageToSend;

                        messagesService.sendMessage( message )
                            .then( function () {

                                $scope.messageToSend = '';

                            } )
                            .catch( function ( error ) {
                                $log.error( error );
                            } );
                    };
                    $scope.logout = userClientService.logout;
                    $scope.redirectToVkAuthPage = userClientService.redirectToVkAuthPage;

                    $scope.onKeyPress = function ($event) {

                        if ( $event.keyCode == 13 ){

                            $scope.sendMessage();

                        }

                    };

                    $scope.setKingAvailability = function ( isOnline ) {

                        if ( $scope.isKingOnline == isOnline ) return false;

                        if ( isOnline ){

                            $scope.isKingOnline = true;
                            $scope.showKingOnlineBar = true;

                        }else{

                            $scope.isKingOnline = false;
                            $scope.showKingOnlineBar = true;
                            setTimeout( function () {
                                $scope.showKingOnlineBar = false;
                            }, 4000 );

                        }

                    };

                    ///////////////////////////////////////////
                    // ON LOADING
                    ///////////////////////////////////////////

                } ] );
    }
);