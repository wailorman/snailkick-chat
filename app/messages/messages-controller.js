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
        return app.controller( 'MessagesController', function ( $scope, $rootScope, authService, apiService, messagesService, $q, clientsService, $log ) {

            $scope.messages = [];
            //$scope.messages = messagesService.messages ? messagesService.messages.reverse() : [];

            $scope.messageToSend = '';

            $scope.getMessagesFromMessagesService = function () {

                if ( messagesService.messages ) {
                    $scope.messages = messagesService.messages.clone();
                    $scope.messages.reverse();
                    $scope.$applyAsync();
                }
            };

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

            $scope.clients = clientsService.clients;

            $rootScope.$on( 'messagesService:messages_update', function () {

                $scope.getMessagesFromMessagesService();
                $scope.$applyAsync();

            } );

            $scope.client = {
                name:   'Сергей Попов',
                avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg',
                logout: function () {

                    //console.log( 'logout!' );

                }
            };

        } );
    }
);