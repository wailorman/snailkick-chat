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
                '$scope', '$rootScope', '$q', '$log', 'messagesService', 'clientsService', 'userClientService', 'boxStateService',
                function ( $scope, $rootScope, $q, $log, messagesService, clientsService, userClientService, boxStateService ) {

                    ///////////////////////////////
                    // Variables
                    ///////////////////////////////
                    $scope.messageToSend = '';

                    $scope.statusesDescription = {
                        elf: 'Эльф-помощник',
                        king: 'Хозяин'
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
                            }
                        ],
                        function () {

                            $scope.chatBoxState = boxStateService.state;
                            $scope.userClient = userClientService.clientInfo;
                            $scope.messages = messagesService.messages.clone().reverse();
                            $scope.clients = clientsService.clients;

                        }
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

                    ///////////////////////////////////////////
                    // ON LOADING
                    ///////////////////////////////////////////

                } ] );
    }
);